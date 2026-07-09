package connectserver

import (
	"context"
	"net/http"

	"connectrpc.com/connect"
	propertyv1 "github.com/emersonary/spencer-ting/api/gen/property/v1"
	"github.com/emersonary/spencer-ting/api/gen/property/v1/propertyv1connect"
	"github.com/emersonary/spencer-ting/api/internal/service"
	grpcserver "github.com/emersonary/spencer-ting/api/internal/transport/grpc"
)

func RegisterPropertyRoutes(mux *http.ServeMux, properties *service.PropertyService) {
	path, handler := propertyv1connect.NewPropertyServiceHandler(
		NewPropertyHandler(grpcserver.NewPropertyServer(properties)),
	)
	mux.Handle(path, handler)
}

type PropertyHandler struct {
	inner *grpcserver.PropertyServer
}

func NewPropertyHandler(inner *grpcserver.PropertyServer) *PropertyHandler {
	return &PropertyHandler{inner: inner}
}

func (h *PropertyHandler) ListProperties(
	ctx context.Context,
	req *connect.Request[propertyv1.ListPropertiesRequest],
) (*connect.Response[propertyv1.ListPropertiesResponse], error) {
	resp, err := h.inner.ListProperties(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *PropertyHandler) GetProperty(
	ctx context.Context,
	req *connect.Request[propertyv1.GetPropertyRequest],
) (*connect.Response[propertyv1.GetPropertyResponse], error) {
	resp, err := h.inner.GetProperty(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *PropertyHandler) SearchProperties(
	ctx context.Context,
	req *connect.Request[propertyv1.SearchPropertiesRequest],
) (*connect.Response[propertyv1.SearchPropertiesResponse], error) {
	resp, err := h.inner.SearchProperties(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

func (h *PropertyHandler) SubmitInquiry(
	ctx context.Context,
	req *connect.Request[propertyv1.SubmitInquiryRequest],
) (*connect.Response[propertyv1.SubmitInquiryResponse], error) {
	resp, err := h.inner.SubmitInquiry(ctx, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(resp), nil
}

var _ propertyv1connect.PropertyServiceHandler = (*PropertyHandler)(nil)
