package app

import (
	"context"

	"github.com/emersonary/spencer-ting/api/internal/service"
	"go.uber.org/zap"
)

func WireDefaultServices(ctx context.Context, app *SpencerTingApplication) error {
	_ = ctx

	if app.Config.Accounts.Enabled {
		app.Logger.Info("account urls",
			zap.String("frontend", app.Config.Accounts.FrontendURL),
			zap.String("api_public", app.Config.Accounts.APIPublicURL),
		)
	}

	if app.Config.Properties.Enabled {
		app.Properties = service.NewPropertyService()
	}

	app.Logger.Info("application services wired")
	return nil
}
