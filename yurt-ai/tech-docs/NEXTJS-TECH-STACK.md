# Next.js Frontend Tech Stack & Architecture

## Overview

This is a modern React application built with Next.js App Router, TypeScript, Material-UI for components, and Zustand for client-side state management. The application follows **Next.js App Router conventions** with file-based routing, server and client components, server actions, and co-located domain logic for maximum maintainability and scalability.

For full-stack projects, optional GraphQL Code Generator integration provides type-safe GraphQL communication with backends.

## Core Technologies

### Framework & Runtime

- **Next.js** - React framework with App Router
  - File-based routing
  - Server and Client Components
  - Server Actions
  - Built-in optimization (images, fonts, scripts)
  - Incremental Static Regeneration (ISR)
- **React** - Modern UI library with hooks
- **TypeScript** - Strict mode enabled for type safety

### GraphQL & Code Generation _(Full-Stack Only)_

- **GraphQL** _(Optional)_ - Query language for API communication
- **GraphQL Code Generator** _(Optional)_ - Automatic TypeScript type generation
  - `@graphql-codegen/cli` - CLI tool for code generation
  - `@graphql-codegen/client-preset` - Client-side preset for typed queries/mutations
  - `@graphql-typed-document-node/core` - Typed GraphQL documents
- **Type-safe GraphQL operations** - Fully typed queries and mutations
  - Automatic type inference from schema
  - IntelliSense for query fields

> _Note: Only needed for projects integrating with a GraphQL backend_

### State Management

- **Zustand** - Lightweight state management library
  - Simple, unopinionated API
  - No boilerplate
  - React hooks integration
  - TypeScript-first design
- **React Server Components** - Server-side state and data fetching
- **React Context** (when needed) - Component tree state sharing

### UI Framework & Styling

- **Material-UI (MUI)** - Comprehensive React component library
- **@mui/material-nextjs** - MUI integration for Next.js App Router
  - Server-side rendering support
  - Emotion cache configuration
  - Theme integration
- **Emotion** - CSS-in-JS styling solution
  - `@emotion/react` - Core styling engine
  - `@emotion/styled` - Styled components API
  - `@emotion/cache` - Style cache for SSR
- **Custom theme system** - Centralized design tokens
  - Typography
  - Color palette
  - Component overrides

### Routing

- **Next.js App Router** - File-based routing system
  - Nested routes and layouts
  - Route groups
  - Dynamic routes with `[param]` syntax
  - Server and client components
  - Error boundaries and loading states
  - Parallel routes and intercepting routes

### Forms & Validation

- **Zod** - TypeScript-first schema validation
  - Environment variable validation
  - Form input validation
  - Runtime type checking
- **Server Actions** - Form submission and mutations
  - Progressive enhancement
  - Type-safe mutations
  - Revalidation strategies

### Testing

- **Jest** - JavaScript testing framework
  - Next.js configuration via `next/jest`
  - Automatic Next.js and TypeScript handling
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **jsdom** - DOM implementation for Node.js

### Development Tools

- **ESLint** - Code linting with multiple plugins:
  - `eslint-config-next` - Next.js recommended rules
  - `@typescript-eslint` - TypeScript-specific rules
  - `eslint-plugin-prettier` - Prettier integration
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking

## File Structure

```
packages/nextjs-app/
├── public/
│   └── fonts/                    # Custom web fonts
├── src/
│   ├── app/                      # App Router directory (file-based routing)
│   │   ├── layout.tsx            # Root layout (wraps all pages)
│   │   ├── page.tsx              # Home page (/)
│   │   ├── providers.tsx         # Client-side providers (MUI, Zustand)
│   │   ├── globals.css           # Global styles
│   │   └── [feature]/            # Feature-based routes
│   │       ├── [dynamic]/        # Dynamic route segment
│   │       │   ├── page.tsx      # Route page component
│   │       │   ├── actions.ts    # Server actions
│   │       │   ├── schemas.ts    # Zod validation schemas
│   │       │   └── components/   # Route-specific components
│   │       │       └── *.tsx
│   │       └── layout.tsx        # Feature layout (optional)
│   ├── components/               # Shared UI components
│   │   ├── icons/                # Custom icon components
│   │   └── *.tsx                 # Reusable components
│   ├── graphql/                  # GraphQL operations (Full-Stack Only)
│   │   ├── gen/                  # Generated TypeScript types (auto-generated)
│   │   ├── queries/              # GraphQL queries
│   │   │   └── *.ts
│   │   └── mutations/            # GraphQL mutations
│   │       └── *.ts
│   ├── stores/                   # Zustand stores
│   │   └── *.ts
│   ├── lib/                      # Utility functions and helpers
│   │   └── *.ts                  # Shared utilities
│   ├── types/                    # Shared TypeScript types
│   │   └── *.ts
│   ├── theme/                    # MUI theme configuration
│   │   ├── components/           # Component overrides
│   │   │   ├── button.ts
│   │   │   └── index.ts
│   │   ├── index.ts              # Theme export
│   │   ├── palette.ts            # Color palette
│   │   ├── typography.ts         # Typography scale
│   │   └── fonts.ts              # Font definitions
│   ├── tests/                    # Test utilities and setup
│   │   ├── setup.ts              # Test configuration
│   │   ├── setupTests.ts         # Jest setup
│   │   └── *.test.ts             # Test files
│   └── config.ts                 # Environment configuration
├── .eslintrc.mjs / eslint.config.mjs  # ESLint configuration
├── codegen.ts                    # GraphQL Code Generator config (Full-Stack Only)
├── jest.config.js                # Jest configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js type declarations
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Getting started guide
```

## Key Architectural Patterns

### App Router Organization

The application uses Next.js App Router with file-based routing:

1. **Pages** (`src/app/*/page.tsx`)

   - Each `page.tsx` represents a route
   - Can be Server Components (default) or Client Components
   - Automatic code splitting per route
   - Support for dynamic routes using `[param]` syntax

2. **Layouts** (`src/app/*/layout.tsx`)

   - Wrap pages and nested routes
   - Preserve state between navigations
   - Root layout wraps entire application
   - Feature layouts for shared UI within sections

3. **Server Actions** (`src/app/*/actions.ts`)

   - Server-side mutations and data operations
   - Type-safe with TypeScript
   - Callable from Client Components
   - Automatic revalidation support

4. **Route-Specific Components** (`src/app/*/components/`)

   - Components used only within that route
   - Co-located with the page for easy discovery
   - Can be Server or Client Components

5. **Validation Schemas** (`src/app/*/schemas.ts`)

   - Zod schemas for form validation
   - Co-located with forms and server actions
   - Type-safe input validation

6. **Shared Components** (`src/components/*`)
   - Generic, reusable UI building blocks
   - Used across multiple routes
   - Can be Server or Client Components

### Server vs Client Components

- **Server Components** (default)

  - Direct data fetching
  - Access to backend resources
  - No JavaScript sent to client
  - Render on server only

- **Client Components** (`'use client'` directive)
  - Interactive UI with event handlers
  - Browser APIs and hooks (useState, useEffect)
  - Zustand stores
  - MUI components with interactivity

### GraphQL Code Generation _(Full-Stack Only)_

> _This section only applies to projects with a GraphQL backend_

- **Schema-first approach** - Backend GraphQL schema is source of truth
- **Automatic type generation** - Run `pnpm codegen` to generate types
- **Type-safe operations** - All queries and mutations are fully typed
- **Generated artifacts** in `src/graphql/gen/` (gitignored)
- **Documents** in `src/graphql/queries/` and `src/graphql/mutations/`

Example workflow:

```typescript
// Define query in src/graphql/queries/users.ts
import { gql } from '@graphql-typed-document-node/core';

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user(userId: $userId) {
      id
      email
      name
    }
  }
`;

// After running codegen, types are automatically available
// Use in server component or client component with GraphQL client
```

### Zustand State Management

- **Store files** in `src/stores/`
- **Naming convention**: `use[Name]Store.ts` (e.g., `useToastStore.ts`)
- **Client-side only** - Used with Client Components
- **Simple, hook-based API**
- **TypeScript-first** - Fully typed stores

Example store:

```typescript
import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
}

export const useCountStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Theme System

Custom MUI theme with centralized design tokens:

- **Palette** - Color scheme and semantic colors
- **Typography** - Font families, sizes, and weights
- **Fonts** - Custom font loading and configuration
- **Component Overrides** - Global component styling
- **Type-safe theme** - TypeScript declarations for custom properties
- **Next.js integration** via `@mui/material-nextjs`
  - Server-side rendering
  - Emotion cache setup
  - Automatic critical CSS injection

### Configuration Management

- **Type-safe environment variables** using Zod in `src/config.ts`
- Next.js environment variable conventions:
  - `NEXT_PUBLIC_*` - Exposed to browser
  - Other env vars - Server-side only
- Example configuration:
  - `NEXT_PUBLIC_API_URL` - Public API endpoint
  - `DATABASE_URL` - Server-only database connection
  - `API_SECRET_KEY` - Server-only secrets

## Development Workflow

### Starting Development Server

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:3001)
pnpm dev

# Start dev server with Turbopack (faster)
pnpm dev:turbo

# Start dev server with network access
pnpm dev:host
```

### GraphQL Code Generation _(Full-Stack Only)_

```bash
# Generate TypeScript types from GraphQL schema
pnpm codegen
```

Run this whenever:

- Backend schema changes
- New queries or mutations are added
- GraphQL operations are modified

> _Only needed for projects with a GraphQL backend_

### Type Checking

```bash
# TypeScript type checking (automatic via Next.js)
pnpm build
```

### Linting

```bash
# Run ESLint
pnpm lint
```

### Building for Production

```bash
# Build optimized production bundle
pnpm build

# Start production server
pnpm start
```

### Testing

```bash
# Run tests
pnpm test
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `~/` → `src/`

Examples:

```typescript
import { theme } from '~/theme';
import { Button } from '~/components/Button';
import { useToastStore } from '~/stores/useToastStore';
import { GET_USER } from '~/graphql/queries/users';
import { formatDate, cn } from '~/lib/utils';
import type { User } from '~/types/user';
```

Configured in:

- `tsconfig.json` - TypeScript resolution
- `jest.config.js` - Jest module resolution
- Automatically supported by Next.js

## Module System

- **Type**: ES Modules (ESM)
- **Target**: ES2017
- **Module Resolution**: Bundler (Next.js)
- **JSX**: Preserve (Next.js handles transformation)

## TypeScript Configuration

### Strict Mode Features

- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused function parameters
- `noUncheckedIndexedAccess: true` - Safer array/object access

### Compiler Options

- **Isolated Modules** - Each file can be transpiled independently
- **No Emit** - Next.js handles bundling, TypeScript only type-checks
- **Skip Lib Check** - Faster compilation
- **Resolve JSON Module** - Import JSON files directly
- **Incremental** - Faster subsequent builds
- **Next.js Plugin** - Automatic type checking for App Router

## Next.js Configuration

### Core Settings

- **React Strict Mode** - Enabled for better development warnings
- **TypeScript** - Automatic TypeScript support
- **App Router** - Using `app/` directory
- **Turbopack** - Available via `--turbo` flag (faster builds)

### Built-in Optimizations

- **Image Optimization** - `next/image` component
- **Font Optimization** - `next/font` for web fonts
- **Script Optimization** - `next/script` for third-party scripts
- **Automatic Code Splitting** - Per-route bundles
- **Tree Shaking** - Remove unused code
- **Minification** - Production builds

### Server Components Benefits

- **Reduced JavaScript** - Less code sent to client
- **Direct data fetching** - No client-side data fetching libraries needed
- **Automatic streaming** - Progressive page rendering
- **SEO-friendly** - Fully rendered HTML

## Material-UI Integration

### Theme Provider

The app uses MUI's App Router integration:

- **Root layout** wraps children with `ThemeProvider`
- **Emotion cache** configured for SSR
- **Next.js font integration** - Automatic font optimization
- Custom palette, typography, and component overrides

### Global Styles

- **CssBaseline** - Normalize browser styles
- **Global CSS** in `app/globals.css`
- **Theme-aware styling** with MUI's `sx` prop

### Component Patterns

- Use MUI components for consistency
- Custom styled components via Emotion
- Theme-aware styling with `theme` object
- Responsive design with `sx` prop and breakpoints

## Available Scripts

| Script           | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `pnpm dev`       | Start development server on port 3001                    |
| `pnpm dev:turbo` | Start dev server with Turbopack (faster)                 |
| `pnpm dev:host`  | Start dev server with network access                     |
| `pnpm build`     | Build optimized production bundle                        |
| `pnpm start`     | Start production server on port 3001                     |
| `pnpm lint`      | Run ESLint on TypeScript files                           |
| `pnpm test`      | Run test suite with Jest                                 |
| `pnpm codegen`   | Generate TypeScript types from GraphQL schema (Optional) |

## ESLint Configuration

### Enabled Rules

- **Next.js** - Core Web Vitals and TypeScript recommendations
- **Prettier** - Code formatting enforcement
- **TypeScript** - TypeScript-specific rules:
  - `@typescript-eslint/no-unused-vars: error` - Prevent unused variables
  - Ignore pattern: Variables starting with `_`
- **Generated code ignored** - `src/graphql/gen/**` excluded from linting

## Production Deployment

### Environment Configuration

Set the following environment variables in production:

- Server-only variables (secrets, API keys)
- `NEXT_PUBLIC_*` variables for client-side access
- Database connection strings
- Third-party API keys

### Build Configuration

- **Build Command**: `pnpm build`
- **Start Command**: `pnpm start`
- **Node Version**: LTS recommended

### Deployment Platforms

Works with:

- **Vercel** - Optimal Next.js hosting (automatic optimization)
- **Netlify** - Next.js support with adapters
- **AWS / GCP / Azure** - Container or VM deployment
- **Docker** - Containerized deployment

### Deployment Flow

1. Install dependencies with pnpm
2. Run GraphQL code generation (`pnpm codegen`) _(if using GraphQL)_
3. Build optimized production bundle (`pnpm build`)
4. Start production server (`pnpm start`)

## Security Considerations

### Environment Variables

- `NEXT_PUBLIC_*` variables are **publicly exposed** to the browser
- Never store secrets in `NEXT_PUBLIC_*` variables
- Server-only variables are never sent to the client
- Use Server Actions for sensitive operations

### Server Actions Security

- Validate all inputs with Zod schemas
- Always revalidate data after mutations
- Use Next.js built-in CSRF protection
- Sanitize user inputs

### Content Security Policy

- Configure CSP headers in `next.config.ts`
- Use nonce-based CSP for inline scripts
- Restrict external script sources

## Performance Optimizations

### Server Components

- Default to Server Components when possible
- Reduce client-side JavaScript bundle
- Direct data fetching without waterfalls

### Code Splitting

- Automatic route-based code splitting
- Dynamic imports for heavy components
- Lazy loading with `next/dynamic`

### Caching Strategies

- **Static Generation** - Pre-render at build time
- **Incremental Static Regeneration (ISR)** - Revalidate static pages
- **Server-side Rendering (SSR)** - Render on each request
- **Client-side caching** - Zustand for UI state

### Image Optimization

- Use `next/image` component
- Automatic image optimization
- Responsive images with `sizes` prop
- Lazy loading by default

### Font Optimization

- Use `next/font` for web fonts
- Automatic font subsetting
- Self-host Google Fonts
- Eliminate layout shift

## Testing Strategy

### Unit Tests

- Component isolation with React Testing Library
- Hook testing with `renderHook`
- Utility function testing

### Integration Tests

- Route testing with Next.js test utilities
- Server Action testing
- Form submission flows

### Test Setup

- Global test utilities in `src/tests/setup.ts`
- Jest configuration in `jest.config.js`
- Automatic Next.js environment setup

## Future Enhancements

Based on architecture:

- [ ] Add E2E testing with Playwright
- [ ] Implement internationalization (i18n) with `next-intl`
- [ ] Add image upload and optimization flows
- [ ] Implement middleware for auth and redirects
- [ ] Add OpenGraph and metadata optimization
- [ ] Set up incremental static regeneration (ISR) strategies
- [ ] Implement parallel routes and intercepting routes
- [ ] Add route handlers for API endpoints
- [ ] Set up monitoring (Vercel Analytics, Sentry)
- [ ] Implement progressive web app (PWA) features
- [ ] Add Storybook for component documentation
- [ ] Set up database connection pooling for serverless
