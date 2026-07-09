package config

import (
	"strings"

	appkitconfig "github.com/emersonary/appkit/config"
)

const DefaultAppName = "spencer-ting api"

func LoadOptions() appkitconfig.LoadOptions {
	return appkitconfig.LoadOptions{
		EnvPrefix:      "SPENCER_TING",
		ConfigEnvVar:   "SPENCER_TING_CONFIG",
		DefaultAppName: DefaultAppName,
	}
}

type Config struct {
	appkitconfig.BaseConfig `mapstructure:",squash"`
	Properties PropertiesConfig `mapstructure:"properties" json:"properties"`
	Posts      PostsConfig      `mapstructure:"posts" json:"posts"`
}

func (c *Config) Infra() *appkitconfig.BaseConfig {
	return &c.BaseConfig
}

type PropertiesConfig struct {
	Enabled bool `mapstructure:"enabled" json:"enabled"`
}

type PostsConfig struct {
	LaunchJWTSecret string `mapstructure:"launch_jwt_secret" json:"-"`
	AdminURL        string `mapstructure:"admin_url" json:"admin_url"`
	ProjectID       string `mapstructure:"project_id" json:"project_id"`
}

func (p PostsConfig) ProjectIDOrDefault() string {
	if id := strings.TrimSpace(p.ProjectID); id != "" {
		return id
	}
	return "spencer-ting"
}
