# Spencer Ting — NYC Luxury Real Estate

Marketing platform for Spencer Ting, built on the same patterns as [sahar](https://github.com/emersonary/sahar).

## Stack

- **Web**: Vite 8 + React 19 + TypeScript + i18next (12 languages)
- **API**: Go + appkit `runtime.Application` + Connect RPC
- **Auth**: appkit accounts block
- **Blog**: posts service (shared)
- **Local**: Docker Compose

## Quick Start

```bash
# From spencer-ting/
cp .env.example .env
docker compose up -d --build
```

| Service    | URL                    |
|------------|------------------------|
| Web        | http://localhost:5182  |
| API        | http://localhost:8084  |
| Posts API  | http://localhost:8091  |
| Posts Admin| http://localhost:5176  |

## Development (without Docker)

```bash
# Proto codegen
make proto

# API
cd api && go run ./cmd/server

# Web
cd web && npm install && npm run generate:proto && npm run dev
```

## Sibling Dependencies

```
Delphi7/
  spencer-ting/     ← this project
  via-jeri/appkit/  ← accounts + runtime
  posts/            ← blog service
```

## Features

- Spencer-first marketing (hero, testimonials, video section)
- Property gallery with search/filters
- Mortgage calculator
- Buy/sell process timelines
- NYC neighborhood guides
- Blog via posts project (`projectId: spencer-ting`)
- Multilingual: EN, ES, ZH, PT, IT, DE, RU, AR, JA, KO, HE, TR
- User login via appkit accounts
- LinkedIn + Instagram integration (links; embed TBD)

## Strategy

Sell **Spencer**, not houses. The site positions Spencer as NYC's trusted luxury real estate advisor — with tools, guides, and curated properties that bring visitors back.
