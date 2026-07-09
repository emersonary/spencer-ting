package app

import (
	"context"

	"github.com/emersonary/appkit/runtime"
	"github.com/emersonary/spencer-ting/api/internal/config"
	"github.com/emersonary/spencer-ting/api/internal/service"
)

type SpencerTingApplication struct {
	*runtime.Application[*config.Config]
	Properties *service.PropertyService
}

type WireFunc func(ctx context.Context, app *SpencerTingApplication) error

type Options struct {
	WireServices WireFunc
}

func New(ctx context.Context, cfg *config.Config, opts Options) (*SpencerTingApplication, error) {
	app := &SpencerTingApplication{}

	wireServices := opts.WireServices
	if wireServices == nil {
		wireServices = WireDefaultServices
	}

	_, err := runtime.New(ctx, cfg, runtime.Options[*config.Config]{
		WireServices: func(ctx context.Context, rt *runtime.Application[*config.Config]) error {
			app.Application = rt
			return wireServices(ctx, app)
		},
		Transport: app,
	})
	if err != nil {
		return nil, err
	}

	return app, nil
}
