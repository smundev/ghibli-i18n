# Frontend Tech Stack & Architecture

## Overview

This is a modern React single-page application (SPA) built with TypeScript, Material-UI for components, and Vite for blazing-fast development and optimized production builds. The application follows **idiomatic React conventions** with a feature-based architecture, clear separation between pages and features, and co-located domain logic for maximum maintainability and scalability.

For full-stack projects, optional Apollo Client integration provides type-safe GraphQL communication with backends.

## Core Technologies

### Runtime & Language

- **React** - Modern UI library with hooks
- **TypeScript** - Strict mode enabled for type safety
- **Vite** - Next-generation frontend build tool with HMR

### GraphQL & State Management _(Full-Stack Only)_

- **Apollo Client** _(Optional)_ - GraphQL client with intelligent caching
  - Integrated with React hooks (`useQuery`, `useMutation`)
  - In-memory normalized cache
  - Optimistic UI updates
- **GraphQL** _(Optional)_ - Query language for API communication

> _Note: Only needed for projects integrating with a GraphQL backend_

### UI Framework & Styling

- **Material-UI (MUI)** - Comprehensive React component library
- **Emotion** - CSS-in-JS styling solution
  - `@emotion/react` - Core styling engine
  - `@emotion/styled` - Styled components API
- **Custom theme system** - Centralized design tokens
  - Typography
  - Color palette
  - Component overrides

### Routing

- **React Router** - Client-side routing with data loading
  - Nested routes and layouts
  - URL parameters
  - Error boundaries

### Forms & Validation

- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation
  - Environment variable validation
  - Form input validation

### Testing

- **Vitest** - Fast unit test framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **jsdom** - DOM implementation for Node.js
- **MSW (Mock Service Worker)** - API mocking for testing and development
  - Intercepts network requests
  - Provides consistent mock data
  - Works in both browser and Node.js

### Development Tools

- **Vite SWC Plugin** - Fast refresh with SWC (faster than Babel)
- **ESLint** - Code linting with multiple plugins:
  - @typescript-eslint - TypeScript-specific rules
  - eslint-plugin-react - React best practices
  - eslint-plugin-react-hooks - Hooks rules
  - eslint-plugin-react-refresh - Fast refresh compatibility
  - eslint-plugin-unicorn - Additional code quality rules
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking (watch mode available)

## File Structure

```
packages/react-apollo/
├── public/
│   └── mockServiceWorker.js      # MSW service worker
├── src/
│   ├── pages/                    # Route-level components
│   │   ├── HomePage.tsx          # Home page route
│   │   ├── ErrorPage.tsx         # Error boundary page
│   │   └── NotFoundPage.tsx      # 404 page
│   ├── features/                 # Domain-specific features
│   │   └── home/                 # Home feature domain
│   │       ├── components/       # Feature-specific components
│   │       ├── hooks/            # Feature-specific hooks
│   │       └── graphql/          # Feature-specific queries/mutations (Full-Stack Only)
│   ├── components/               # Shared UI components
│   │   └── Layout.tsx            # Layout wrapper component
│   ├── graphql/                  # Global GraphQL operations (Full-Stack Only)
│   │   ├── client.ts             # Apollo Client configuration
│   │   ├── queries/              # Shared queries
│   │   │   └── index.ts
│   │   └── mutations/            # Shared mutations
│   │       └── index.ts
│   ├── hooks/                    # Shared custom hooks
│   │   └── storage/
│   │       ├── useBrowserStorage.tsx
│   │       └── useLocalStorage.tsx
│   ├── styles/                   # Global styles and theme
│   │   ├── global.ts
│   │   └── theme/
│   │       ├── components/       # MUI component overrides
│   │       │   ├── button.ts
│   │       │   └── index.ts
│   │       ├── index.ts
│   │       ├── palette.ts
│   │       └── typography.ts
│   ├── lib/                      # Utility functions and helpers
│   ├── types/                    # Shared TypeScript types
│   │   └── theme.d.ts
│   ├── assets/                   # Static assets (images, icons)
│   │   └── icons/
│   ├── tests/                    # Test utilities and setup
│   │   ├── mocks/
│   │   │   ├── browser.ts        # MSW browser worker
│   │   │   └── handlers.ts       # MSW request handlers
│   │   └── setup.ts              # Test configuration
│   ├── config.ts                 # Environment configuration
│   ├── constants.ts              # Application constants
│   ├── App.test.tsx              # App component tests
│   ├── App.tsx                   # Root application component
│   ├── index.tsx                 # Application entry point
│   ├── routes.tsx                # Route definitions
│   └── vite-env.d.ts             # Vite type declarations
├── .eslintrc.cjs                 # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # Node-specific TS config
├── vite.config.ts                # Vite configuration
└── README.md                     # Getting started guide
```

## Key Architectural Patterns

### Feature-Based Organization

The application follows **idiomatic React conventions** with clear separation of concerns:

1. **Pages** (`src/pages/*`)

   - Route-level components with `Page` suffix (e.g., `HomePage.tsx`, `NotFoundPage.tsx`)
   - Thin components that compose features and shared components
   - Represent the entry point for each route

2. **Features** (`src/features/*`)

   - Domain-specific logic organized by business concern (e.g., `home/`)
   - Each feature contains its own `components/`, `hooks/`, and `graphql/` subdirectories
   - Co-locates related functionality for easy maintenance and discoverability
   - Self-contained and independently testable

3. **Shared Components** (`src/components/*`)

   - Generic, reusable UI building blocks (e.g., `Layout.tsx`, `Button.tsx`)
   - No domain-specific logic
   - Used across multiple features or pages

4. **Shared Hooks** (`src/hooks/*`)

   - Custom React hooks used across multiple features
   - Examples: storage hooks, form hooks, data fetching utilities

5. **Global GraphQL** (`src/graphql/*`) _(Full-Stack Only)_
   - Apollo Client configuration
   - Shared queries and mutations used by multiple features
   - Feature-specific GraphQL operations live within their feature directory
   - Only needed for projects with a GraphQL backend

### Naming Conventions

Following modern React community standards:

- **Pages**: PascalCase with `Page` suffix (e.g., `HomePage.tsx`, `NotFoundPage.tsx`)

  - Distinguishes route-level components from reusable UI components
  - Makes routing structure immediately obvious

- **Features**: Lowercase folder names by domain (e.g., `features/home/`, `features/dashboard/`)

  - Component files within features use plain PascalCase (e.g., `HomeHeader.tsx`)
  - No "Feature" suffix needed—the folder structure provides context

- **Shared Components**: Plain PascalCase (e.g., `Button.tsx`, `Modal.tsx`, `Layout.tsx`)

  - No "Component" suffix
  - Names describe what they are, not that they're components

- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`, `useAuth.ts`)

  - Follows React's built-in hook naming convention

- **Utilities**: camelCase for functions (e.g., `formatDate.ts`, `validators.ts`)
  - Grouped in the `lib/` directory

### Apollo Client Setup _(Full-Stack Only)_

- **Apollo Client** configured in `src/graphql/client.ts`
- **Apollo Provider** wraps the entire application in `src/index.tsx`
- **HTTP Link** connects to GraphQL backend
- **In-Memory Cache** for client-side data caching
- **GraphQL operations** can be:
  - Co-located within feature directories (`features/[domain]/graphql/`)
  - Centralized in `src/graphql/queries/` and `src/graphql/mutations/` for shared operations

> _Only needed for projects with a GraphQL backend_

### Routing Architecture

- **Page components** in `src/pages/` serve as route entry points
- **Layout components** in `src/components/` provide consistent structure
- **Nested routes** for parent-child relationships
- **Error boundaries** for graceful error handling (`ErrorPage.tsx`)
- **404 handling** via catch-all route (`NotFoundPage.tsx`)
- Routes defined in `src/routes.tsx` using React Router

### Theme System

Custom MUI theme with centralized design tokens:

- **Palette** - Color scheme and semantic colors
- **Typography** - Font families, sizes, and weights
- **Component Overrides** - Global component styling
- **Type-safe theme** - TypeScript declarations for custom properties

### Configuration Management

- **Type-safe environment variables** using Zod in `src/config.ts`
- All Vite environment variables must be prefixed with `VITE_`
- Example configuration:
  - `VITE_GRAPHQL_URL` - GraphQL API endpoint
  - `VITE_API_TIMEOUT` - API request timeout
  - Additional env vars as needed per project requirements

### Mock Service Worker (MSW)

- **Development mocking** - Test UI without backend
- **Test mocking** - Consistent test data
- **Handler-based** - Define responses for GraphQL operations
- **Browser integration** - Intercepts actual network requests

## Development Workflow

### Starting Development Server

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:3000)
pnpm dev

# Start dev server with network access
pnpm dev:host
```

### Type Checking

```bash
# Run TypeScript compiler in watch mode
pnpm tsc
```

### Linting

```bash
# Run ESLint
pnpm lint
```

### Building for Production

```bash
# Type check and build
pnpm build

# Preview production build locally
pnpm preview
```

### Testing

```bash
# Run tests
pnpm test
```

Note: Vitest setup is configured but test implementation is pending.

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `~/` → `src/`

Examples:

```typescript
import { theme } from '~/styles/theme';
import { Layout } from '~/components/Layout';
import { HomePage } from '~/pages/HomePage';
import { useLocalStorage } from '~/hooks/storage/useLocalStorage';
```

Configured in:

- `tsconfig.json` - TypeScript resolution
- `vite.config.ts` - Vite bundler resolution

## Module System

- **Type**: ES Modules (ESM)
- **Target**: ES2020
- **Module Resolution**: Bundler (Vite)
- **JSX**: React JSX (automatic runtime, no React import needed)

## TypeScript Configuration

### Strict Mode Features

- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals` - Error on unused variables
- `noUnusedParameters` - Error on unused function parameters
- `noFallthroughCasesInSwitch` - Prevent switch fallthrough bugs

### Compiler Options

- **Isolated Modules** - Each file can be transpiled independently (required for SWC)
- **No Emit** - Vite handles bundling, TypeScript only type-checks
- **Skip Lib Check** - Faster compilation
- **Resolve JSON Module** - Import JSON files directly

## Vite Configuration

### Development Server

- **Port**: 3000
- **Hot Module Replacement (HMR)** - Instant updates without full reload
- **Fast Refresh** - Preserves React component state

### Build Optimization

- **SWC Transformation** - Faster than Babel
- **Code Splitting** - Automatic chunk optimization
- **Asset Optimization** - Image compression and optimization
- **Tree Shaking** - Remove unused code

### Test Integration

- **Vitest** configured with:
  - jsdom environment for DOM testing
  - Global test APIs (`describe`, `it`, `expect`)
  - Automatic test file discovery
  - Fast watch mode

## GraphQL Integration _(Full-Stack Only)_

> _This section only applies to projects with a GraphQL backend_

### Query Management

```typescript
// Centralized query definitions
export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user(userId: $userId) {
      id
      email
      name
    }
  }
`;

// Component usage
const { loading, error, data } = useQuery(GET_USER, {
  variables: { userId: 123 },
});
```

### Mutation Management

```typescript
// Centralized mutation definitions
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      email
      name
    }
  }
`;

// Component usage
const [createUser, { loading, error }] = useMutation(CREATE_USER);
```

### Caching Strategy

- **Normalized cache** by `id` field
- **Automatic cache updates** for queries
- **Optimistic responses** for instant UI updates
- **Cache persistence** (can be configured)

## Material-UI Integration

### Theme Provider

The entire app is wrapped in MUI's `ThemeProvider`:

- Custom palette colors
- Typography scale
- Component default props
- Responsive breakpoints

### Global Styles

- **CssBaseline** - Normalize browser styles
- **GlobalStyles** - Application-wide CSS
- **Color Scheme** - Automatic dark/light mode support

### Component Patterns

- Use MUI components for consistency
- Custom styled components via Emotion
- Theme-aware styling with `theme` object
- Responsive design with `sx` prop

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Start development server on port 3000 |
| `pnpm dev:host` | Start dev server with network access  |
| `pnpm build`    | Type check and build for production   |
| `pnpm preview`  | Preview production build locally      |
| `pnpm lint`     | Run ESLint on TypeScript files        |
| `pnpm tsc`      | Run TypeScript compiler in watch mode |
| `pnpm test`     | Run test suite with Vitest            |

## ESLint Configuration

### Enabled Rules

- **TypeScript** - Recommended TypeScript rules
- **React** - React best practices and hooks rules
- **Prettier** - Code formatting enforcement
- **Custom Rules**:
  - `no-console: error` - Prevent console statements in production
  - `curly: error` - Require curly braces for all control statements
  - `no-nested-ternary: error` - Prevent nested ternary operators
  - `radix: error` - Require radix parameter in `parseInt`
  - `unicorn/switch-case-braces: error` - Enforce braces in switch cases

## Production Deployment (Render)

### Environment Configuration

When deploying to Render, add the following environment variables:

- `HUSKY="0"` - Disable Husky git hooks
- `SKIP_INSTALL_DEPS="true"` - Prevent npm usage (use pnpm)
- `VITE_GRAPHQL_URL` - Backend GraphQL API URL
- Additional `VITE_*` variables as needed per your configuration

### Build Configuration

- **Build Command**: `pnpm build`
- **Publish Directory**: `dist`
- **Node Version**: LTS

### Deployment Flow

1. Install dependencies with pnpm
2. Run TypeScript type checking
3. Build optimized production bundle with Vite
4. Serve static files from `dist` directory

## Security Considerations

### Environment Variables

- All env vars prefixed with `VITE_` are **publicly exposed**
- Never store secrets in Vite env vars
- Use backend for sensitive operations

### Content Security Policy

- Configure CSP headers at the hosting level
- Restrict script sources in production
- Use nonce or hash-based CSP for inline scripts

### Authentication

- JWT tokens can be handled via Apollo Client HTTP links
- Secure token storage using browser storage hooks
- Authentication logic can be implemented in a dedicated `features/auth/` directory

## Performance Optimizations

### Code Splitting

- Route-based code splitting via React Router and lazy-loaded pages
- Feature-based code splitting for large domain modules
- Dynamic imports for heavy components
- Lazy loading for below-the-fold content

### Bundle Size

- Tree shaking via Vite
- Dead code elimination
- Minification and compression

### Caching

- Apollo Client in-memory cache
- Browser storage hooks for persistent data
- Service worker for offline support (can be added)

## Testing Strategy

### Unit Tests

- Component isolation with React Testing Library
- Hook testing with `renderHook`
- Utility function testing

### Integration Tests

- MSW for GraphQL mocking
- User interaction flows
- Error state handling

### Test Setup

- Global test utilities in `src/tests/setup.ts`
- Mock handlers in `src/tests/mocks/handlers.ts`
- Automatic cleanup after each test

## Future Enhancements

Based on project structure:

- [ ] Complete Vitest test suite implementation
- [ ] Add E2E testing with Playwright or Cypress
- [ ] Implement additional features following the feature-based pattern
- [ ] Add service workers for offline support (PWA)
- [ ] Implement lazy loading for feature modules
- [ ] Add performance monitoring (Web Vitals)
- [ ] Enhance error boundary handling with error reporting
- [ ] Add internationalization (i18n)
- [ ] Implement form validation utilities in `lib/`
- [ ] Add Storybook for component documentation
