# Backend Tech Stack & Architecture

## Overview

This backend is a GraphQL API server built with Apollo Server, Express, Prisma ORM, and PostgreSQL. It follows a modular schema architecture using Nexus for code-first GraphQL type generation.

## Core Technologies

### Runtime & Language

- **Node.js** - ES2022+ modules (LTS version)
- **TypeScript** - Strict mode enabled
- **tsx** - TypeScript execution for development and scripts

### API Layer

- **Apollo Server** - GraphQL server implementation (v4+)
- **Express** - HTTP server and middleware
- **GraphQL** - API query language
- **Nexus** - Code-first GraphQL schema construction

### Database & ORM

- **PostgreSQL** - Primary database (via Docker)
- **Prisma** - Modern ORM and migration tool
  - Type-safe database client
  - Migration management
  - Seeding capabilities

### Security & Middleware

- **helmet** - Security headers
- **cors** - CORS handling
- **express-oauth2-jwt-bearer** - JWT authentication middleware

### Logging & Monitoring

- **pino** - Fast JSON logger
- **pino-pretty** - Development-friendly log formatting
- **@sentry/node** - Error tracking and monitoring (optional)

### Utilities

- **zod** - Schema validation (used for env vars and data validation)
- **axios** - HTTP client
- **date-fns** - Date manipulation
- **nanoid** - Unique ID generation
- **dotenv** - Environment variable management

### Testing

- **Jest** - Test framework
- **ts-jest** - TypeScript transformer for Jest
- **supertest** - HTTP integration testing
- **jest-mock-extended** - Enhanced mocking utilities
- Test database: Separate PostgreSQL instance on port 5434

### Development Tools

- **nodemon** - Auto-reload during development
- **ESLint** - Code linting
  - @typescript-eslint/eslint-plugin & parser
  - eslint-plugin-unicorn
- **resolve-tspaths** - Path alias resolution for builds

## File Structure

```
packages/backend/
├── prisma/
│   ├── migrations/          # Database migration files
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.ts              # Database seeding script
├── src/
│   ├── apolloPlugins/       # Apollo Server plugins
│   │   ├── logger.ts        # Pino logging plugin
│   │   └── sentry.ts        # Sentry error tracking plugin
│   ├── schemaModules/       # Modular GraphQL schema definitions
│   │   └── user/            # User domain module example
│   │       ├── index.ts                    # Module exports
│   │       ├── objectTypes.userSchema.ts   # User type definitions
│   │       ├── queries.userSchema.ts       # User queries
│   │       ├── mutations.userSchema.ts     # User mutations
│   │       └── tests/                      # Module-specific tests
│   ├── services/            # Business logic services
│   │   └── Http/
│   │       ├── Http.service.ts
│   │       └── Http.service.unit.test.ts
│   ├── shared/              # Shared utilities and types
│   │   ├── constants.ts     # Shared constants
│   │   ├── utils.ts         # Utility functions
│   │   └── types/           # Shared type definitions
│   │       └── gen/
│   │           └── nexus-typegen/  # Auto-generated Nexus types
│   ├── tests/               # Global test utilities
│   │   ├── __helpers.ts     # Test helper functions
│   │   └── index.test.ts    # Integration tests
│   ├── config.ts            # Environment configuration with Zod validation
│   ├── context.ts           # GraphQL context creation
│   ├── loggers.ts           # Logger configuration
│   ├── permissions.ts       # GraphQL Shield permissions
│   ├── prismaClient.ts      # Prisma client instance
│   ├── prismaSingleton.ts   # Singleton Prisma instance (test)
│   ├── schema.ts            # Nexus schema builder
│   ├── schemaTypes.ts       # Root types and scalar definitions
│   ├── server.ts            # Server entry point
│   └── serverSetup.ts       # Express & Apollo server setup
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── jest.config.mjs          # Jest testing configuration
├── nodemon.json             # Nodemon dev server config
├── package.json             # Dependencies and scripts
├── schema.graphql           # Generated GraphQL schema (auto-generated)
├── tsconfig.json            # TypeScript configuration
└── README.md                # Getting started guide
```

## Key Architectural Patterns

### Schema Organization

The GraphQL schema is organized in a **modular domain-driven** structure:

1. **Root Schema** (`src/schemaTypes.ts`)

   - Defines root Query and Mutation types
   - Defines custom scalar types (e.g., Date)
   - Imports all domain modules

2. **Domain Modules** (`src/schemaModules/*`)

   - Each domain (e.g., `user`) has its own directory
   - Contains: object types, queries, mutations, and tests
   - Self-contained business logic

3. **Schema Generation** (`src/schema.ts`)
   - Uses Nexus to compile all types into executable schema
   - Generates TypeScript types and GraphQL SDL
   - Outputs:
     - `schema.graphql` - GraphQL SDL
     - `src/shared/types/gen/nexus-typegen/index.d.ts` - TypeScript types

### Context Pattern

- **Context creation** (`src/context.ts`)
  - Injects Prisma client into every resolver
  - Includes HTTP headers for authentication
  - Type-safe context interface

### Permissions Layer

- **Custom permissions middleware** (`src/permissions.ts`)
  - Authorization rules for GraphQL operations
  - Currently allows all queries/mutations (starter setup)
  - Designed to be extended with JWT validation and role-based access

### Server Initialization

- **server.ts** - Main entry point
- **serverSetup.ts** - Factory functions for Express and Apollo
  - Configures security middleware (Helmet, CORS)
  - Sets up health check endpoint (`/healthz`)
  - Integrates logging and error tracking plugins
  - Applies permissions middleware to GraphQL schema

### Configuration Management

- **Type-safe environment variables** using Zod
- Required env vars:
  - `DATABASE_URL` - PostgreSQL connection string
  - `LOG_LEVEL` - Logging verbosity
  - `NODE_ENV` - Environment (development, test, production)
  - `PORT` - Server port
  - `GRAPHQL_PATH` - GraphQL endpoint path

## Code Generation Workflow

The backend uses a two-step code generation process:

1. **Prisma Generation** (`pnpm generate:prisma`)

   - Generates type-safe Prisma Client from `schema.prisma`
   - Creates TypeScript types for database models

2. **Nexus Generation** (`pnpm generate:nexus`)
   - Generates GraphQL SDL from Nexus schema definitions
   - Generates TypeScript types for resolvers and context

**Combined command**: `pnpm generate`

## Database Workflow

### Development

```bash
# Generate Prisma client
pnpm generate:prisma

# Create a new migration (without applying)
pnpm migrate:create

# Apply migrations to development DB
pnpm migrate

# Generate Nexus types
pnpm generate:nexus

# Seed the database
pnpm seed
```

### Migrations

After updating `prisma/schema.prisma`:

1. `pnpm generate:prisma` - Update Prisma client
2. `pnpm migrate:create` - Create migration SQL
3. `pnpm migrate` - Apply to database
4. `pnpm generate:nexus` - Update GraphQL types

### Production Deployment

- `pnpm migrate:deploy` - Applies migrations without interactive prompts

## Testing Strategy

### Test Database

- Separate PostgreSQL instance for testing
- Port: 5434 (vs. 5432 for dev)
- Managed via Docker Compose: `docker-compose.jest.yml`

### Running Tests

```bash
# Start test database
pnpm db:test:start

# Run all tests (includes migration)
pnpm test
```

### Test Structure

- **Unit tests**: Co-located with source files (`.unit.test.ts`)
- **Integration tests**: Domain-specific tests in `schemaModules/*/tests/`
- **Test helpers**: Shared utilities in `src/tests/__helpers.ts`

### Jest Configuration

- Uses `ts-jest` for TypeScript transformation
- Path aliases: `~/*` maps to `src/*`
- ESM module support with `import.meta` polyfill
- Runs in band (`--runInBand`) for database test isolation

## Available Scripts

| Script                 | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `pnpm dev`             | Start development server with nodemon                       |
| `pnpm build`           | Production build (install deps, generate, compile, migrate) |
| `pnpm generate`        | Generate Prisma & Nexus types                               |
| `pnpm generate:prisma` | Generate Prisma client only                                 |
| `pnpm generate:nexus`  | Generate Nexus schema only                                  |
| `pnpm migrate`         | Run Prisma migrations (dev)                                 |
| `pnpm migrate:create`  | Create migration without applying                           |
| `pnpm migrate:deploy`  | Apply migrations (production)                               |
| `pnpm seed`            | Seed the database                                           |
| `pnpm test`            | Run Jest tests with test DB                                 |
| `pnpm db:test:start`   | Start test database container                               |
| `pnpm lint`            | Run ESLint                                                  |

## Development Flow

1. **Start dependencies**

   ```bash
   # From project root
   docker compose up
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Generate types**

   ```bash
   pnpm generate
   ```

4. **Start dev server**

   ```bash
   pnpm dev
   ```

5. **Access Apollo Sandbox**
   - URL: `http://localhost:8080/api/graphql`
   - Introspection enabled in development mode

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `~/` → `src/`

Example: `import { logger } from '~/loggers'`

## Module System

- **Type**: ES Modules (ESM)
- **Target**: ESNext
- **Module Resolution**: Node
- Configured via `"type": "module"` in `package.json`

## Security Features

1. **Helmet** - Security headers
   - Content Security Policy configured for Apollo Sandbox
2. **CORS** - Cross-origin resource sharing
3. **OAuth2 JWT Bearer** - JWT validation middleware (available)
4. **Custom Permissions Middleware** - Authorization layer for GraphQL operations
5. **Input Validation** - Zod schema validation

## Logging Strategy

- **Structured JSON logging** with Pino
- **Request ID tracking** via nanoid
- **Pretty printing** in development
- **Apollo plugin** for GraphQL operation logging
- **Log levels** configurable via environment

## Error Handling

- **Sentry integration** (optional, currently commented)
- **Apollo error handling**
  - External errors allowed in development
  - Debug mode in development
- **Graceful HTTP server drain** via Apollo plugin

## Production Deployment (Render)

1. Create PostgreSQL database
2. Create Web Service with:
   - **Root Directory**: `packages/backend`
   - **Build Command**: `pnpm build;`
   - **Start Command**: `node dist/src/server.js`
   - **Branch**: `main` or `develop`
3. Set environment variables:
   - `DATABASE_URL`
   - `NODE_ENV=production`
   - `PORT`, `LOG_LEVEL`, `GRAPHQL_PATH`

## Future Enhancements

Based on code comments and structure:

- [ ] Enable Sentry error tracking
- [ ] Implement request ID correlation in logs
- [ ] Add authentication rules to permissions middleware
- [ ] Expand JWT bearer token validation
