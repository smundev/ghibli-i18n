# Frontend

A React app built with Vite, TypeScript, MUI, and Apollo Client. It pairs with the
`backend` package and renders Studio Ghibli films. The UI is English-only.

## Tech Stack

- [React](https://react.dev/) with TypeScript
- [Vite](https://vitejs.dev/) (SWC) for bundling and the dev server
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL data fetching
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) for typed hooks
- [MUI](https://mui.com/) for UI components
- [React Router](https://reactrouter.com/) for routing
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing

## Screens

- **Welcome** (`/`) — a short overview of Studio Ghibli and a **View Movies** button.
- **Movies** (`/movies`) — fetches films via Apollo Client and renders each film's
  image, title, and details.

## Getting Started

1. From the repository root run `pnpm install`.
2. Copy `.env.example` to `.env`.
3. Make sure the `backend` package is running (see `packages/backend/README.md`),
   and that its `schema.graphql` exists (run `pnpm --filter ./packages/backend generate`).
4. From `packages/frontend` run `pnpm codegen` to generate the typed hooks.
5. From `packages/frontend` run `pnpm dev` to start the dev server on
   `http://localhost:3000`.

## Available Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start the Vite dev server                        |
| `pnpm dev:host`      | Start the Vite dev server exposed on the network |
| `pnpm build`         | Type-check and build for production              |
| `pnpm lint`          | Run Biome                                        |
| `pnpm type`          | Run `tsc` type-checking                          |
| `pnpm type:watch`    | Run `tsc` type-checking in watch mode            |
| `pnpm test`          | Run tests with Vitest                            |
| `pnpm preview`       | Preview the production build locally             |
| `pnpm codegen`       | Generate typed GraphQL hooks and types           |
| `pnpm codegen:watch` | Run codegen in watch mode                        |

## GraphQL Codegen

This package uses [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
to produce typed hooks from the backend schema. Operations are defined in
`src/graphql/` (e.g. `src/graphql/films.ts`) and the generated output is written to
`src/graphql/gen/graphql.ts`. Codegen reads the backend SDL at
`../backend/schema.graphql`.

Regenerate after editing an operation:

```sh
pnpm codegen
```

Then import the generated hooks, e.g. `useGetFilmsQuery` from `~/graphql/gen/graphql`.

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_GRAPHQL_URL="http://localhost:8080/api/graphql"
```
