package app

import (
	"context"
	"net/http"

	accounttransport "github.com/emersonary/appkit/accounts/transport"
	"github.com/emersonary/appkit/accounts/oauth"
	"github.com/emersonary/appkit/runtime"
	"github.com/emersonary/spencer-ting/api/internal/config"
	grpcserver "github.com/emersonary/spencer-ting/api/internal/transport/grpc"
	httpserver "github.com/emersonary/spencer-ting/api/internal/transport/http"
	"google.golang.org/grpc"
)

var _ runtime.TransportWire[*config.Config] = (*SpencerTingApplication)(nil)

func (a *SpencerTingApplication) NewGRPCServer() *grpc.Server {
	return grpcserver.NewServer(a.Accounts, a.Properties)
}

func (a *SpencerTingApplication) WireRoutes(ctx context.Context, rt *runtime.Application[*config.Config], mux *http.ServeMux, grpcSrv *grpc.Server) error {
	_ = ctx

	if a.Accounts != nil {
		accounttransport.New(a.Accounts, &accounttransport.Mount{
			HTTPMux:    mux,
			GRPCServer: grpcSrv,
		})

		if _, ok := a.Accounts.OAccountProvider(oauth.ProviderGoogle); ok {
			a.Logger.Info("google oauth enabled")
		} else {
			a.Logger.Warn("google oauth disabled — set accounts.google.client_id and client_secret in config")
		}
	}

	if mux != nil {
		httpserver.New(rt.Config, mux, a.Accounts, a.Properties)
	}
	return nil
}

func (a *SpencerTingApplication) WrapHTTP(next http.Handler) http.Handler {
	return httpserver.WrapCORS(a.Config.Accounts.FrontendURL, next)
}
