package httpserver

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/emersonary/appkit/accounts"
	"github.com/emersonary/spencer-ting/api/internal/config"
	"github.com/emersonary/spencer-ting/api/internal/service"
	connectserver "github.com/emersonary/spencer-ting/api/internal/transport/connectserver"
	"github.com/golang-jwt/jwt/v5"
)

type Server struct {
	cfg        *config.Config
	accounts   *accounts.Service
	properties *service.PropertyService
	mux        *http.ServeMux
}

func New(
	cfg *config.Config,
	mux *http.ServeMux,
	accountsSvc *accounts.Service,
	properties *service.PropertyService,
) *Server {
	s := &Server{
		cfg:        cfg,
		accounts:   accountsSvc,
		properties: properties,
		mux:        mux,
	}
	s.routes()
	return s
}

func WrapCORS(frontendURL string, next http.Handler) http.Handler {
	return corsMiddleware(frontendURL, next)
}

func (s *Server) routes() {
	s.mux.HandleFunc("GET /healthz", s.handleHealth)
	s.mux.HandleFunc("GET /account/posts-admin-launch", s.handlePostsAdminLaunch)
	if s.properties != nil {
		connectserver.RegisterPropertyRoutes(s.mux, s.properties)
	}
}

func (s *Server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

type postsLaunchClaims struct {
	ProjectID string `json:"project_id"`
	Email     string `json:"email"`
	IsAdmin   bool   `json:"is_admin"`
	jwt.RegisteredClaims
}

type postsAdminLaunchResponse struct {
	URL   string `json:"url"`
	Token string `json:"token"`
}

func (s *Server) handlePostsAdminLaunch(w http.ResponseWriter, r *http.Request) {
	if s.accounts == nil {
		http.Error(w, "accounts unavailable", http.StatusServiceUnavailable)
		return
	}

	token, ok := bearerFromRequest(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	session, err := s.accounts.SessionFromToken(r.Context(), token)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if !session.Account.IsAdmin {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	if strings.TrimSpace(s.cfg.Posts.LaunchJWTSecret) == "" || strings.TrimSpace(s.cfg.Posts.AdminURL) == "" {
		http.Error(w, "posts launch not configured", http.StatusServiceUnavailable)
		return
	}

	launchToken, err := s.issuePostsLaunchJWT(session.Account.ID, session.Account.Email)
	if err != nil {
		http.Error(w, "failed to mint launch token", http.StatusInternalServerError)
		return
	}

	launchURL := s.buildPostsAdminLaunchURL(launchToken)
	resp := postsAdminLaunchResponse{URL: launchURL, Token: launchToken}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func (s *Server) issuePostsLaunchJWT(accountID, email string) (string, error) {
	now := time.Now()
	claims := postsLaunchClaims{
		ProjectID: s.cfg.Posts.ProjectIDOrDefault(),
		Email:     strings.TrimSpace(email),
		IsAdmin:   true,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   accountID,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(8 * time.Hour)),
		},
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(s.cfg.Posts.LaunchJWTSecret))
}

func (s *Server) buildPostsAdminLaunchURL(token string) string {
	base := stringsTrimRightSlash(s.cfg.Posts.AdminURL)
	callback := stringsTrimRightSlash(s.cfg.Accounts.FrontendURL) + "/blog"
	params := url.Values{}
	params.Set("token", token)
	params.Set("project", s.cfg.Posts.ProjectIDOrDefault())
	params.Set("callback", callback)
	return fmt.Sprintf("%s/launch?%s", base, params.Encode())
}

func bearerFromRequest(r *http.Request) (string, bool) {
	auth := r.Header.Get("Authorization")
	if !strings.HasPrefix(auth, "Bearer ") {
		return "", false
	}
	token := strings.TrimSpace(strings.TrimPrefix(auth, "Bearer "))
	return token, token != ""
}

func corsMiddleware(frontendURL string, next http.Handler) http.Handler {
	allowedOrigins := map[string]bool{
		stringsTrimRightSlash(frontendURL): true,
	}
	if u, err := url.Parse(stringsTrimRightSlash(frontendURL)); err == nil && isLoopbackHost(u.Hostname()) && u.Port() != "" {
		allowedOrigins[fmt.Sprintf("http://127.0.0.1:%s", u.Port())] = true
		allowedOrigins[fmt.Sprintf("http://localhost:%s", u.Port())] = true
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if origin != "" && (allowedOrigins[origin] || localDevOriginAllowed(origin, frontendURL)) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type, Connect-Protocol-Version, Connect-Timeout-Ms, X-Grpc-Web, X-User-Agent")
		w.Header().Set("Access-Control-Max-Age", fmt.Sprintf("%d", int((10 * time.Minute).Seconds())))

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func isLoopbackHost(host string) bool {
	return host == "localhost" || host == "127.0.0.1"
}

func localDevOriginAllowed(origin, frontendURL string) bool {
	o, err := url.Parse(origin)
	if err != nil || (o.Scheme != "http" && o.Scheme != "https") {
		return false
	}
	f, err := url.Parse(stringsTrimRightSlash(frontendURL))
	if err != nil || !isLoopbackHost(f.Hostname()) {
		return false
	}
	return isLoopbackHost(o.Hostname())
}

func stringsTrimRightSlash(s string) string {
	for len(s) > 0 && s[len(s)-1] == '/' {
		s = s[:len(s)-1]
	}
	return s
}
