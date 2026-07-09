# Spencer Ting — Lightsail deploy

Production URL: **https://spencerting.solidia.app**

## Prerequisites (one-time)

1. **DNS** — `A` record: `spencerting.solidia.app` → Lightsail instance IP (same host as solidia.app / sahar).

2. **GitHub secrets** (repo → Settings → Secrets → Actions):
   - `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_PORT` (same as sahar / iron-macho)
   - `SPENCER_TING_DATABASE_PASSWORD` (optional — falls back to server postgres password)
   - `SPENCER_TING_ACCOUNTS_JWT_SECRET` (optional — generated on first deploy)
   - `GODADDY_API_KEY`, `GODADDY_API_SECRET` (optional — auto-create DNS A record)

3. **TLS** — certbot runs automatically on deploy when DNS resolves.

## What CI deploys

| Path | Purpose |
|------|---------|
| `/var/www/spencer-ting` | Vite static site |
| `/opt/spencer-ting-api` | Go API binary + config + migrations |
| `/etc/nginx/sites-available/spencer-ting` | nginx vhost |
| `/etc/nginx/snippets/spencer-ting-api-proxy.conf` | API → `127.0.0.1:18084`, blog → `127.0.0.1:8083` |
| `spencer-ting-api.service` | systemd unit |

## Manual checks on server

```bash
curl -s http://127.0.0.1:18084/healthz
curl -I http://spencerting.solidia.app/
sudo systemctl status spencer-ting-api
```
