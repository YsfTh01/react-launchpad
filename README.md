# React + Vite + TypeScript Boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Production-grade React boilerplate with feature-based architecture, designed for large-scale applications.

## ✨ Features

- **Feature-Based Architecture** - Self-contained, removable feature modules
- **Type-Safe** - Full TypeScript support with strict mode
- **Modern Stack** - React 19, Vite 7, Tailwind CSS v4
- **State Management** - TanStack Query (server) + Zustand (client)
- **Internationalization** - react-i18next with EN/TR support
- **Testing** - Vitest + Testing Library + MSW + Playwright E2E
- **Documentation** - Storybook for component development
- **Code Quality** - ESLint + Prettier + Husky + Commitlint
- **Dark Mode** - Built-in theme support (Light/Dark/System)
- **UI Components** - Complete design system with forms, tables, modals
- **PWA Support** - Offline-first with service worker caching
- **Performance Monitoring** - Web Vitals tracking
- **Error Tracking** - Sentry integration ready
- **Analytics** - PostHog integration for user behavior tracking
- **Feature Flags** - Built-in feature flag system with DevTools
- **API Type Generation** - OpenAPI → TypeScript automatic type generation
- **CI/CD** - GitHub Actions workflows (lint, test, build, deploy)
- **Code Generation** - Plop templates for features, components, hooks
- **Bundle Analysis** - Visualize bundle size with `pnpm build:analyze`
- **Security Headers** - CSP, X-Frame-Options, and more

## Tech Stack

| Category       | Technology                       |
| -------------- | -------------------------------- |
| Framework      | React 19                         |
| Build Tool     | Vite 7                           |
| Language       | TypeScript 5.9                   |
| Styling        | Tailwind CSS v4                  |
| Routing        | React Router v7                  |
| Server State   | TanStack Query v5                |
| Client State   | Zustand                          |
| Forms          | React Hook Form + Zod            |
| HTTP Client    | Axios                            |
| i18n           | react-i18next                    |
| Unit Testing   | Vitest + Testing Library         |
| E2E Testing    | Playwright                       |
| API Mocking    | MSW                              |
| Docs           | Storybook                        |
| Tables         | TanStack Table                   |
| Notifications  | Sonner                           |
| Error Tracking | Sentry                           |
| Analytics      | PostHog                          |
| Feature Flags  | Built-in + PostHog               |
| Performance    | Web Vitals                       |
| PWA            | vite-plugin-pwa                  |
| Git Hooks      | Husky + lint-staged + Commitlint |
| CI/CD          | GitHub Actions                   |
| Code Gen       | Plop                             |
| API Types      | openapi-typescript               |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Aybavs/react-launchpad.git
cd boilerplate

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

### Available Scripts

| Script                    | Description                                 |
| ------------------------- | ------------------------------------------- |
| `pnpm dev`                | Start development server                    |
| `pnpm build`              | Build for production                        |
| `pnpm build:analyze`      | Build with bundle analyzer                  |
| `pnpm preview`            | Preview production build                    |
| `pnpm test`               | Run unit tests                              |
| `pnpm test:ui`            | Run tests with UI                           |
| `pnpm test:coverage`      | Run tests with coverage                     |
| `pnpm test:e2e`           | Run E2E tests (Playwright)                  |
| `pnpm test:e2e:ui`        | Run E2E tests with UI                       |
| `pnpm lint`               | Lint code                                   |
| `pnpm lint:fix`           | Fix lint errors                             |
| `pnpm format`             | Format code                                 |
| `pnpm typecheck`          | Type check                                  |
| `pnpm storybook`          | Start Storybook                             |
| `pnpm generate`           | Run Plop generator                          |
| `pnpm generate:feature`   | Generate a new feature                      |
| `pnpm generate:component` | Generate a new component                    |
| `pnpm generate:hook`      | Generate a new hook                         |
| `pnpm generate:api-types` | Generate TypeScript types from OpenAPI spec |
| `pnpm cleanup`            | Remove optional features interactively      |

## 🧹 Feature Cleanup

Don't need all features? Remove them easily with the cleanup script:

```bash
pnpm cleanup
```

**Interactive menu will let you remove:**

- 📚 Storybook (component documentation)
- 🐛 Sentry (error tracking)
- 📊 PostHog (analytics & feature flags)
- 🎭 MSW (API mocking)
- ⚡ Performance Monitoring (Web Vitals)

**Example:**

```
? Which features do you want to remove?
  1. Storybook
  2. Sentry
  3. PostHog
  4. MSW
  5. Performance Monitoring
  0. Remove all
  q. Quit

Enter feature number(s) to remove (comma-separated): 2,3

✨ Cleanup completed!
```

The script will:

- ✅ Remove files and directories
- ✅ Update package.json (dependencies & scripts)
- ✅ Clean up environment variables
- ✅ Patch code to remove references

## 🤖 Dependency Management (Optional)

This project includes **Renovate** configuration for automatic dependency updates.

### Setup Renovate

1. **Install GitHub App**: [https://github.com/apps/renovate](https://github.com/apps/renovate)
2. **Select your repository** and approve access
3. **Merge the onboarding PR** that Renovate creates
4. **Automatic updates** will run every weekend

### What Renovate Does

- 📦 Creates PRs for outdated dependencies
- 🔒 Alerts for security vulnerabilities
- ⚡ Auto-merges minor/patch updates (configurable)
- 📊 Groups related updates together

### Alternative: Dependabot

If you prefer GitHub's native solution, replace `renovate.json` with:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
```

### Manual Updates

```bash
pnpm outdated        # Check outdated packages
pnpm update --latest # Update all packages
```

- ✅ Patch code to remove references

## Project Structure

```
src/
├── app/                    # App shell & entry point
│   ├── providers/          # Global providers (Query, Auth, Modal, i18n)
│   ├── router/             # Route configuration & guards
│   └── layouts/            # Page layouts (Dashboard, Auth)
│
├── core/                   # Core infrastructure (feature-agnostic)
│   ├── api/                # API client setup
│   ├── auth/               # Auth primitives (context, hooks)
│   ├── store/              # Global state (UI, theme)
│   └── ui/                 # Design system components
│
├── features/               # Feature modules
│   ├── auth/               # Authentication feature
│   ├── dashboard/          # Dashboard feature
│   ├── settings/           # Settings feature
│   ├── users/              # Users management feature
│   └── notifications/      # Notifications feature
│
├── shared/                 # Cross-cutting concerns
│   ├── constants/          # App constants
│   ├── hooks/              # Shared hooks
│   ├── types/              # Global types
│   ├── utils/              # Utility functions
│   └── validation/         # Zod schemas
│
├── config/                 # App configuration
├── i18n/                   # Internationalization
├── styles/                 # Global styles
└── test/                   # Test utilities
```

## UI Components

### Core Components

```typescript
import {
  // Layout
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,

  // Form
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,

  // Feedback
  Toaster,
  toast,
  useToast,
  Modal,
  useModal,
  Skeleton,

  // Navigation
  Breadcrumbs,
  useBreadcrumbs,

  // Data Display
  DataTable,

  // Theme
  ThemeSwitcher,
  ThemeToggle,
} from '@/core/ui'
```

### Toast Notifications

```typescript
const { success, error, warning, promise } = useToast()

success('Saved successfully!')
error('Something went wrong')
warning('Please check your input')

// Async operations
promise(saveData(), {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save',
})
```

### Modal System

```typescript
const { open, openConfirm, close } = useModal()

// Custom modal
open(<MyContent />, {
  title: 'Edit User',
  size: 'lg', // sm | md | lg | xl | full
})

// Confirmation dialog
openConfirm({
  title: 'Delete Item?',
  description: 'This action cannot be undone.',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  variant: 'danger', // default | warning | danger
  onConfirm: handleDelete,
})
```

### Data Table

```typescript
import { DataTable, type ColumnDef } from '@/core/ui'

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
]

<DataTable
  data={users}
  columns={columns}
  enableSorting
  enablePagination
  pageSize={10}
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>
```

### Theme Support

```typescript
// Component-based
<ThemeSwitcher />  // Full Light/Dark/System buttons
<ThemeToggle />    // Simple icon toggle

// Programmatic
import { useUIStore } from '@/core/store'
const { theme, setTheme } = useUIStore()
setTheme('dark') // 'light' | 'dark' | 'system'
```

## Feature Modules

### Users Feature

```typescript
import { UsersPage, useUsers, useCreateUser } from '@/features/users'
import { UserCard, UserTable } from '@/features/users/components'
```

### Notifications Feature

```typescript
import { NotificationBell, useUnreadCount } from '@/features/notifications'

// Add to header
<NotificationBell />
```

## Architecture

### Feature-Based Architecture

Each feature is a self-contained module that can be added or removed with minimal effort:

```
features/[feature-name]/
├── index.ts              # Public API (barrel export)
├── pages/                # Route pages (lazy-loaded)
├── components/           # Feature components
├── api/                  # API queries & mutations
├── hooks/                # Feature hooks
├── types/                # Feature types
└── store/                # Feature state (optional)
```

### Import Rules

The architecture enforces strict import boundaries:

- **Features** cannot import from other features
- **Core** cannot import from features or app
- **Shared** cannot import from any other layer

These rules are enforced via ESLint.

### Adding a Feature

Use the Plop generator for consistent feature scaffolding:

```bash
# Interactive mode
pnpm generate:feature

# With options
pnpm generate:feature -- --name my-feature --hasApi yes --hasStore yes
```

This creates:

- `src/features/[name]/index.ts` - Public API
- `src/features/[name]/pages/` - Lazy-loaded pages
- `src/features/[name]/types/` - TypeScript types
- `src/features/[name]/api/` - TanStack Query hooks (optional)
- `src/features/[name]/store/` - Zustand store (optional)
- `src/i18n/locales/*/[name].json` - Translations

### Removing a Feature

1. Delete `src/features/[name]/`
2. Remove from feature registry
3. Remove from `src/i18n/index.ts`
4. Delete translation files
5. Run `pnpm build` to verify

## Changelog & Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.

```bash
# Create a changeset for your changes
pnpm changeset

# Apply changesets and bump version
pnpm version

# Build and publish (if applicable)
pnpm release
```

### Changeset Types

- `major` - Breaking changes
- `minor` - New features
- `patch` - Bug fixes

## Git Workflow

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: extract validation logic
perf: optimize image loading
test: add unit tests for auth
chore: update dependencies
```

### Pre-commit Hooks

- **lint-staged**: Automatically runs ESLint and Prettier on staged files
- **commitlint**: Validates commit messages follow conventional format

## Configuration

### Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Boilerplate
```

### Path Aliases

```typescript
@/          → src/
@/app/      → src/app/
@/core/     → src/core/
@/features/ → src/features/
@/shared/   → src/shared/
```

## Testing

### Unit Tests (Vitest)

```bash
pnpm test              # Run all tests
pnpm test:ui           # Run with UI
pnpm test:coverage     # Run with coverage
```

Use the test utilities for rendering with providers:

```typescript
import { render, screen } from '@/test/utils'

test('renders component', () => {
  render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

### E2E Tests (Playwright)

```bash
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # Run with Playwright UI
pnpm test:e2e:headed   # Run in headed browser
pnpm test:e2e:debug    # Debug mode
```

E2E tests are located in `e2e/` folder:

- `auth.spec.ts` - Authentication flows
- `navigation.spec.ts` - Navigation and routing
- `accessibility.spec.ts` - A11y compliance

## Docker

### Development

```bash
# Run development server in Docker
docker-compose up dev

# Access at http://localhost:5173
```

### Production

```bash
# Build and run production image
docker-compose up app

# Access at http://localhost:3000
```

### Custom Build

```bash
# Build image
docker build -t boilerplate:latest .

# Run container
docker run -p 3000:80 boilerplate:latest
```

The production build uses:

- **Multi-stage build** for optimized image size
- **Nginx** for serving static files
- **Security headers** configured in nginx.conf
- **Health checks** for container orchestration

## Deployment

### Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Deploy
netlify deploy --prod
```

### AWS S3 + CloudFront

```bash
# Build
pnpm build

# Upload to S3
aws s3 sync dist/ s3://your-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

Quick summary:

1. Fork & clone the repository
2. Create a feature branch
3. Follow the architecture rules (see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md))
4. Write tests for new features
5. Use conventional commit messages
6. Run `pnpm lint` and `pnpm typecheck`
7. Submit a pull request

## Security

See [docs/SECURITY.md](./docs/SECURITY.md) for reporting vulnerabilities.

## Documentation

- **Architecture Guide**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Comprehensive architecture analysis
- **Cleanup Guide**: [docs/CLEANUP.md](./docs/CLEANUP.md) - Feature removal guide
- **Changelog**: [docs/CHANGELOG.md](./docs/CHANGELOG.md) - Version history
- **Roadmap**: [docs/ROADMAP.md](./docs/ROADMAP.md) - Future plans
- **Security**: [docs/SECURITY.md](./docs/SECURITY.md) - Security policy
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## License

MIT - See [LICENSE](./LICENSE) file for details

---

**Built with ❤️ for the developer community**
