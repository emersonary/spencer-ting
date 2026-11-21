package service

import (
	"context"
	"errors"
	"strings"
	"sync"

	propertyv1 "github.com/emersonary/spencer-ting/api/gen/property/v1"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

var (
	ErrNotFound       = errors.New("property not found")
	ErrInvalidInquiry = errors.New("invalid inquiry")
)

type PropertyService struct {
	mu        sync.Mutex
	inquiries []propertyv1.SubmitInquiryRequest
	logger    *zap.Logger
}

func NewPropertyService(logger *zap.Logger) *PropertyService {
	if logger == nil {
		logger = zap.NewNop()
	}
	s := &PropertyService{logger: logger}
	s.logger.Info("properties service enabled")
	return s
}

func (s *PropertyService) ListProperties(_ context.Context, req *propertyv1.ListPropertiesRequest) ([]*propertyv1.Property, int32, error) {
	all := staticProperties()
	var filtered []*propertyv1.Property
	for _, p := range all {
		if req.GetFeaturedOnly() && !p.Featured {
			continue
		}
		if status := strings.TrimSpace(req.GetStatus()); status != "" && p.Status != status {
			continue
		}
		filtered = append(filtered, p)
	}
	return paginate(filtered, req.GetLimit(), req.GetOffset())
}

func (s *PropertyService) GetProperty(_ context.Context, id, slug string) (*propertyv1.Property, error) {
	for _, p := range staticProperties() {
		if id != "" && p.Id == id {
			return p, nil
		}
		if slug != "" && p.Slug == slug {
			return p, nil
		}
	}
	return nil, ErrNotFound
}

func (s *PropertyService) SearchProperties(_ context.Context, req *propertyv1.SearchPropertiesRequest) ([]*propertyv1.Property, int32, error) {
	query := strings.ToLower(strings.TrimSpace(req.GetQuery()))
	var filtered []*propertyv1.Property
	for _, p := range staticProperties() {
		if req.GetLuxuryOnly() && !p.Luxury {
			continue
		}
		if n := strings.TrimSpace(req.GetNeighborhood()); n != "" && !strings.EqualFold(p.Neighborhood, n) {
			continue
		}
		if b := strings.TrimSpace(req.GetBorough()); b != "" && !strings.EqualFold(p.Borough, b) {
			continue
		}
		if t := strings.TrimSpace(req.GetPropertyType()); t != "" && p.PropertyType != t {
			continue
		}
		if req.GetMinPrice() > 0 && p.Price < req.GetMinPrice() {
			continue
		}
		if req.GetMaxPrice() > 0 && p.Price > req.GetMaxPrice() {
			continue
		}
		if req.GetMinBedrooms() > 0 && p.Bedrooms < req.GetMinBedrooms() {
			continue
		}
		if req.GetMaxBedrooms() > 0 && p.Bedrooms > req.GetMaxBedrooms() {
			continue
		}
		if query != "" {
			haystack := strings.ToLower(p.Title + " " + p.Address + " " + p.Neighborhood + " " + p.Borough + " " + p.Description)
			if !strings.Contains(haystack, query) {
				continue
			}
		}
		filtered = append(filtered, p)
	}
	return paginate(filtered, req.GetLimit(), req.GetOffset())
}

func (s *PropertyService) SubmitInquiry(_ context.Context, req *propertyv1.SubmitInquiryRequest) (string, error) {
	if req == nil {
		return "", ErrInvalidInquiry
	}
	name := strings.TrimSpace(req.GetName())
	email := strings.TrimSpace(req.GetEmail())
	if name == "" || email == "" || !strings.Contains(email, "@") {
		return "", ErrInvalidInquiry
	}

	id := uuid.NewString()
	copyReq := *req
	copyReq.Name = name
	copyReq.Email = email

	s.mu.Lock()
	s.inquiries = append(s.inquiries, copyReq)
	s.mu.Unlock()

	return id, nil
}

func paginate(items []*propertyv1.Property, limit, offset int32) ([]*propertyv1.Property, int32, error) {
	total := int32(len(items))
	if offset < 0 {
		offset = 0
	}
	if limit <= 0 {
		limit = 50
	}
	start := int(offset)
	if start > len(items) {
		return []*propertyv1.Property{}, total, nil
	}
	end := start + int(limit)
	if end > len(items) {
		end = len(items)
	}
	return items[start:end], total, nil
}

// Only Spencer's current Corcoran exclusives or listings he previously sold or rented
// may appear here (Personal Website Policy § VII). Sample inventory was removed.
func staticProperties() []*propertyv1.Property {
	return []*propertyv1.Property{}
}
