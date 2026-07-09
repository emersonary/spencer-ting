-- +goose Up
-- Spencer Ting public schema. Account tables created by appkit ApplySchema.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE saved_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL,
    property_id TEXT NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT saved_properties_account_property_unique UNIQUE (account_id, property_id)
);

CREATE INDEX idx_saved_properties_account_id ON saved_properties (account_id);

-- +goose Down
DROP TABLE IF EXISTS saved_properties;
