package service

import (
	"context"
	"errors"
	"strings"
	"sync"

	"github.com/google/uuid"
	propertyv1 "github.com/emersonary/spencer-ting/api/gen/property/v1"
)

var (
	ErrNotFound       = errors.New("property not found")
	ErrInvalidInquiry = errors.New("invalid inquiry")
)

type PropertyService struct {
	mu        sync.Mutex
	inquiries []propertyv1.SubmitInquiryRequest
}

func NewPropertyService() *PropertyService {
	return &PropertyService{}
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

func staticProperties() []*propertyv1.Property {
	return []*propertyv1.Property{
		{
			Id: "tribeca-penthouse", Slug: "tribeca-penthouse-4br", Title: "Tribeca Penthouse with Skyline Views",
			Address: "145 Hudson Street, PH", Neighborhood: "Tribeca", Borough: "Manhattan",
			Price: 8950000, Bedrooms: 4, Bathrooms: 4.5, Sqft: 4200, PropertyType: "condo", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
			},
			Description: "A rare full-floor penthouse in the heart of Tribeca. Floor-to-ceiling windows, private terrace, and bespoke finishes throughout.",
			Features:    []string{"Private terrace", "Doorman", "Fitness center", "Wine cellar", "Smart home"},
			Featured: true, Luxury: true, Lat: 40.7195, Lng: -74.0089, YearBuilt: 2018, MonthlyHoa: 3200, MonthlyTaxes: 4100,
		},
		{
			Id: "ues-townhouse", Slug: "upper-east-side-townhouse", Title: "Upper East Side Limestone Townhouse",
			Address: "118 East 78th Street", Neighborhood: "Upper East Side", Borough: "Manhattan",
			Price: 12500000, Bedrooms: 5, Bathrooms: 5.5, Sqft: 6800, PropertyType: "townhouse", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
				"https://images.unsplash.com/photo-1605276374101-dee6adf77948?w=1200",
			},
			Description: "Meticulously restored five-story limestone townhouse with garden, elevator, and original architectural details.",
			Features:    []string{"Private garden", "Elevator", "Wine room", "Chef's kitchen", "Home office"},
			Featured: true, Luxury: true, Lat: 40.7751, Lng: -73.9626, YearBuilt: 1899, MonthlyTaxes: 5200,
		},
		{
			Id: "brooklyn-heights-condo", Slug: "brooklyn-heights-waterfront", Title: "Brooklyn Heights Waterfront Residence",
			Address: "1 Brooklyn Bridge Park, 28A", Neighborhood: "Brooklyn Heights", Borough: "Brooklyn",
			Price: 3200000, Bedrooms: 3, Bathrooms: 2.5, Sqft: 2100, PropertyType: "condo", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
			},
			Description: "Sun-drenched corner unit with unobstructed Manhattan skyline and harbor views. Steps from the promenade.",
			Features:    []string{"Harbor views", "Concierge", "Gym", "Parking available"},
			Featured: true, Luxury: true, Lat: 40.6962, Lng: -73.9969, YearBuilt: 2015, MonthlyHoa: 1800, MonthlyTaxes: 2100,
		},
		{
			Id: "soho-loft", Slug: "soho-cast-iron-loft", Title: "SoHo Cast-Iron Loft",
			Address: "72 Greene Street, 4W", Neighborhood: "SoHo", Borough: "Manhattan",
			Price: 4750000, Bedrooms: 2, Bathrooms: 2, Sqft: 2800, PropertyType: "condo", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
			},
			Description: "Iconic cast-iron building with 12-foot ceilings, original columns, and a chef's kitchen.",
			Features:    []string{"Cast-iron facade", "12-ft ceilings", "Exposed brick", "In-unit laundry"},
			Featured: false, Luxury: true, Lat: 40.7233, Lng: -74.0030, YearBuilt: 1872, MonthlyHoa: 2400, MonthlyTaxes: 2800,
		},
		{
			Id: "west-village-co-op", Slug: "west-village-pre-war", Title: "West Village Pre-War Co-op",
			Address: "44 Perry Street, 3B", Neighborhood: "West Village", Borough: "Manhattan",
			Price: 2890000, Bedrooms: 2, Bathrooms: 2, Sqft: 1650, PropertyType: "co-op", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
			},
			Description: "Charming pre-war co-op on one of the Village's most coveted blocks. Fireplace, herringbone floors, tree-lined views.",
			Features:    []string{"Fireplace", "Pre-war details", "Pet friendly", "Storage"},
			Featured: false, Luxury: false, Lat: 40.7355, Lng: -74.0040, YearBuilt: 1920, MonthlyHoa: 2100, MonthlyTaxes: 1900,
		},
		{
			Id: "central-park-south", Slug: "central-park-south-residence", Title: "Central Park South Residence",
			Address: "220 Central Park South, 52B", Neighborhood: "Midtown", Borough: "Manhattan",
			Price: 18750000, Bedrooms: 4, Bathrooms: 4.5, Sqft: 3800, PropertyType: "condo", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
			},
			Description: "Ultra-luxury residence with direct Central Park views. White-glove service, private dining, and spa.",
			Features:    []string{"Central Park views", "White-glove concierge", "Private dining", "Spa", "Pool"},
			Featured: true, Luxury: true, Lat: 40.7670, Lng: -73.9790, YearBuilt: 2019, MonthlyHoa: 8500, MonthlyTaxes: 7200,
		},
		{
			Id: "dumbo-penthouse", Slug: "dumbo-brooklyn-penthouse", Title: "DUMBO Penthouse Duplex",
			Address: "30 Washington Street, PH", Neighborhood: "DUMBO", Borough: "Brooklyn",
			Price: 5500000, Bedrooms: 3, Bathrooms: 3, Sqft: 3100, PropertyType: "condo", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
			},
			Description: "Duplex penthouse with double-height living room and Brooklyn Bridge views.",
			Features:    []string{"Bridge views", "Duplex", "Private roof deck", "Doorman"},
			Featured: false, Luxury: true, Lat: 40.7033, Lng: -73.9890, YearBuilt: 2017, MonthlyHoa: 2600, MonthlyTaxes: 3100,
		},
		{
			Id: "gramercy-park", Slug: "gramercy-park-apartment", Title: "Gramercy Park Classic Six",
			Address: "34 Gramercy Park East, 8A", Neighborhood: "Gramercy", Borough: "Manhattan",
			Price: 3650000, Bedrooms: 3, Bathrooms: 2, Sqft: 1900, PropertyType: "co-op", Status: "for-sale",
			ImageUrls: []string{
				"https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200",
			},
			Description: "Elegant classic six overlooking Gramercy Park. Key to the private park included.",
			Features:    []string{"Park views", "Gramercy Park key", "Formal dining", "Maid's room"},
			Featured: false, Luxury: true, Lat: 40.7378, Lng: -73.9857, YearBuilt: 1930, MonthlyHoa: 2800, MonthlyTaxes: 2400,
		},
	}
}
