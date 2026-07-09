package grpcserver

import (
	"context"
	"errors"

	accounttransport "github.com/emersonary/appkit/accounts/transport"
	"github.com/emersonary/appkit/accounts"
	propertyv1 "github.com/emersonary/spencer-ting/api/gen/property/v1"
	"github.com/emersonary/spencer-ting/api/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewServer(accountsSvc *accounts.Service, properties *service.PropertyService) *grpc.Server {
	s := grpc.NewServer(
		grpc.UnaryInterceptor(accounttransport.GRPCUnaryInterceptor(accountsSvc)),
	)

	if properties != nil {
		propertyv1.RegisterPropertyServiceServer(s, NewPropertyServer(properties))
	}
	return s
}

type PropertyServer struct {
	propertyv1.UnimplementedPropertyServiceServer
	properties *service.PropertyService
}

func NewPropertyServer(properties *service.PropertyService) *PropertyServer {
	return &PropertyServer{properties: properties}
}

func (s *PropertyServer) ListProperties(ctx context.Context, req *propertyv1.ListPropertiesRequest) (*propertyv1.ListPropertiesResponse, error) {
	items, total, err := s.properties.ListProperties(ctx, req)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "list properties: %v", err)
	}
	return &propertyv1.ListPropertiesResponse{Properties: items, Total: total}, nil
}

func (s *PropertyServer) GetProperty(ctx context.Context, req *propertyv1.GetPropertyRequest) (*propertyv1.GetPropertyResponse, error) {
	property, err := s.properties.GetProperty(ctx, req.GetId(), req.GetSlug())
	if err != nil {
		if errors.Is(err, service.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "property not found")
		}
		return nil, status.Errorf(codes.Internal, "get property: %v", err)
	}
	return &propertyv1.GetPropertyResponse{Property: property}, nil
}

func (s *PropertyServer) SearchProperties(ctx context.Context, req *propertyv1.SearchPropertiesRequest) (*propertyv1.SearchPropertiesResponse, error) {
	items, total, err := s.properties.SearchProperties(ctx, req)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "search properties: %v", err)
	}
	return &propertyv1.SearchPropertiesResponse{Properties: items, Total: total}, nil
}

func (s *PropertyServer) SubmitInquiry(ctx context.Context, req *propertyv1.SubmitInquiryRequest) (*propertyv1.SubmitInquiryResponse, error) {
	id, err := s.properties.SubmitInquiry(ctx, req)
	if err != nil {
		if errors.Is(err, service.ErrInvalidInquiry) {
			return nil, status.Errorf(codes.InvalidArgument, "invalid inquiry")
		}
		return nil, status.Errorf(codes.Internal, "submit inquiry: %v", err)
	}
	return &propertyv1.SubmitInquiryResponse{InquiryId: id}, nil
}
