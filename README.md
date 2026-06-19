# Studio Ghibli Films

A small monorepo that serves Studio Ghibli film details through a GraphQL API
and renders them in a React app. The app is English-only.

- **`packages/backend`** — a GraphQL API (GraphQL Yoga + Pothos) that serves ten
  Studio Ghibli films from local seed data.
- **`packages/frontend`** — a React + Apollo Client app with a Welcome screen and
  a Movies screen that lists the films using generated, typed GraphQL hooks.

## Prerequisites

### Node

This project targets the Node version pinned in `.nvmrc` (currently `24.7.0`):

```bash
nvm install
nvm use
node --version
```

### pnpm

Install pnpm by following the [pnpm installation instructions](https://pnpm.io/installation).

## Install

This is a [pnpm workspace](https://pnpm.io/workspaces), so a single install at the
repository root sets up every package:

```bash
pnpm install
```

## Run

Start the backend and the frontend in two terminals:

```bash
# terminal 1 — GraphQL API on http://localhost:8080/api/graphql
pnpm --filter ./packages/backend dev

# terminal 2 — web app on http://localhost:3000
pnpm --filter ./packages/frontend dev
```

See [`packages/backend/README.md`](packages/backend/README.md) and
[`packages/frontend/README.md`](packages/frontend/README.md) for package-specific
setup, scripts, and environment variables.

## How film data is served

The backend does **not** call an external API at runtime. The four featured films
and six additional titles are stored as local seed data in
`packages/backend/src/schemaModules/film/films.data.ts` (sourced from the public
[Studio Ghibli API](https://ghibliapi.vercel.app/) dataset) and returned directly
by the `films` and `film(id)` queries.

## `translations/`

The top-level `translations/` directory holds Markdown source material for
localizing the app. **These files are not imported or read by any application
code** — the app serves English only. See
[`translations/README.md`](translations/README.md) for details.

## Quality checks

The same checks run in CI:

```bash
pnpm --filter ./packages/backend generate   # Prisma client + schema.graphql
pnpm exec biome check .                      # lint & format
pnpm -r run type                             # TypeScript, all packages
pnpm exec knip                               # unused files / exports / deps
```
