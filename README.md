# pokemon-value-predictor

A deployment-ready MVP for predicting undervalued Pokémon TCG cards across **30-day**, **90-day**, and **6-month** horizons using transparent rule-based scoring.

## Monorepo structure

- `/frontend` — React + Vite + Tailwind dashboard.
- `/worker` — Cloudflare Worker API + D1 scoring backend.
- `/worker/migrations` — D1 schema migrations.
- `/worker/data` — mock seed data for local bootstrap.
- `/wrangler.toml.example` — Cloudflare deployment template.

## Scoring model (rule-based)

`upside_score =`

- `momentum_score * 0.25`
- `catalyst_score * 0.30`
- `grading_score * 0.20`
- `volume_score * 0.15`
- `sentiment_score * 0.10`

Confidence buckets:

- `high` >= 75
- `medium` >= 55 and < 75
- `low` < 55

## Backend endpoints

- `GET /api/cards`
- `GET /api/predictions`
- `GET /api/predictions/top?horizon=90d&limit=20`
- `GET /api/cards/:id`
- `POST /api/ingest/mock-prices`
- `POST /api/score/run`

Includes a `scheduled` handler as a cron placeholder for daily scoring workflows.

## Quickstart

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2) Worker + D1 local

```bash
cd worker
npm install
cp ../wrangler.toml.example ../wrangler.toml
npm run db:migrate
npm run db:seed
npm run dev
```

## MVP notes

- Uses only mock/sample data (no paid APIs required).
- Code structure is prepared for future provider integrations (TCGPlayer, eBay, PSA, Reddit, Discord) via ingest jobs and adapters.
- Optional R2 bucket binding included for archived snapshots.

## Suggested next steps

1. Add provider-specific ingest adapters under `worker/src/providers/*`.
2. Add simple auth for admin-only `POST` endpoints.
3. Persist scored snapshots to R2 for historical strategy comparisons.
4. Replace mock sentiment inputs with derived Reddit/Discord metrics.
