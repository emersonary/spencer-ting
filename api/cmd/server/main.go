package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	appkitconfig "github.com/emersonary/appkit/config"
	"github.com/emersonary/spencer-ting/api/internal/app"
	"github.com/emersonary/spencer-ting/api/internal/config"
)

func main() {
	cfg, err := appkitconfig.Load[config.Config](config.LoadOptions())
	if err != nil {
		fmt.Fprintf(os.Stderr, "load config: %v\n", err)
		os.Exit(1)
	}

	application, err := app.New(context.Background(), cfg, app.Options{})
	if err != nil {
		fmt.Fprintf(os.Stderr, "init application: %v\n", err)
		os.Exit(1)
	}
	defer application.Sync()

	application.Start()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := application.Shutdown(shutdownCtx); err != nil {
		application.LogError("shutdown", err)
		os.Exit(1)
	}
	application.Logger.Info("shutdown complete")
}
