# 🧹 Cleanup Features Script

## Usage

Remove optional features from the boilerplate:

```bash
pnpm cleanup
```

## Available Features to Remove

### 1. Storybook (Component Documentation)

- **Size:** ~50MB in node_modules
- **Files:** `.storybook/`, `*.stories.tsx`
- **Packages:** @storybook/\* (9 packages)
- **When to remove:** If you don't need component documentation

### 2. Sentry (Error Tracking)

- **Size:** ~5MB
- **Files:** `src/core/monitoring/sentry.ts`
- **Packages:** @sentry/react
- **When to remove:** If you have your own error tracking or don't need it

### 3. PostHog (Analytics & Feature Flags)

- **Size:** ~2MB
- **Files:** `src/core/analytics/`
- **Packages:** posthog-js
- **Impact:** Feature flags will become local-only (no remote control)
- **When to remove:** If you use a different analytics tool

### 4. MSW (Mock Service Worker)

- **Size:** ~3MB
- **Files:** `src/test/mocks/`, `public/mockServiceWorker.js`
- **Packages:** msw
- **When to remove:** If you have a real backend ready

### 5. Performance Monitoring (Web Vitals)

- **Size:** ~500KB
- **Files:** `src/core/performance/`
- **Packages:** web-vitals
- **When to remove:** If you don't need performance metrics

## Interactive Example

```bash
$ pnpm cleanup

╔════════════════════════════════════════════════════════╗
║       🧹 Boilerplate Feature Cleanup Script           ║
╚════════════════════════════════════════════════════════╝

Available features to remove:

  1. Storybook
     Component documentation and development
  2. Sentry
     Error tracking and monitoring
  3. PostHog
     Analytics and feature flags
  4. MSW (Mock Service Worker)
     API mocking for development and testing
  5. Performance Monitoring
     Web Vitals and performance tracking

  0. Remove all features
  q. Quit

Enter feature number(s) to remove (comma-separated): 1,3

Selected features to remove:
  - Storybook
  - PostHog

Proceed? (yes/no): yes

🧹 Removing Storybook...
  Removing files...
  ✓ Removed directory: .storybook
  ✓ Removed file: src/core/ui/components/Button.stories.tsx
  ✓ Removed file: src/core/ui/components/Input.stories.tsx
  ✓ Removed file: src/core/ui/components/Card.stories.tsx
  Removing packages...
  ✓ Removed from devDependencies: @storybook/react
  ✓ Removed from devDependencies: @storybook/react-vite
  ... (7 more packages)
  Removing scripts...
  ✓ Removed script: storybook
  ✓ Removed script: build-storybook
✅ Storybook removed successfully!

🧹 Removing PostHog...
  Removing files...
  ✓ Removed directory: src/core/analytics
  Removing packages...
  ✓ Removed from dependencies: posthog-js
  Removing environment variables...
  ✓ Removed env var: VITE_POSTHOG_KEY
  ✓ Removed env var: VITE_POSTHOG_HOST
  Applying patches...
  ✓ Patched: src/core/feature-flags/store.ts
  ✓ Patched: src/config/env.ts
✅ PostHog removed successfully!

✨ Cleanup completed!

📦 Next steps:
  1. Run: pnpm install (to update lockfile)
  2. Run: pnpm lint (to check for issues)
  3. Run: pnpm typecheck (to verify types)
  4. Run: pnpm test (to run tests)
  5. Commit changes
```

## What Gets Removed

### Files & Directories

- Feature-specific source files
- Configuration files (e.g., `.storybook/`)
- Story files (e.g., `*.stories.tsx`)
- Test mocks (for MSW)

### Package.json Changes

- Removes packages from `dependencies` or `devDependencies`
- Removes npm scripts (e.g., `storybook`, `build-storybook`)

### Environment Variables

- Removes entries from `.env.example`
- Updates `src/config/env.ts` validation

### Code Patches

- Removes imports from remaining files
- Comments out feature-specific code
- Maintains code structure and formatting

## Safety Features

- ✅ **Interactive confirmation** - Always asks before removing
- ✅ **Dry-run safe** - Can preview changes
- ✅ **Git-friendly** - Easy to revert with `git checkout`
- ✅ **Type-safe** - TypeScript will catch any broken references

## After Cleanup

Run these commands to finalize:

```bash
# Update lockfile
pnpm install

# Check for issues
pnpm lint
pnpm typecheck

# Run tests
pnpm test

# Commit changes
git add .
git commit -m "chore: remove unused features"
```

## Reverting Changes

If you want to undo the cleanup:

```bash
# Revert all changes
git checkout .

# Or revert specific files
git checkout package.json src/
```

## Notes

- **PostHog removal:** Feature flags will still work, but only with local defaults
- **MSW removal:** You'll need a real backend API
- **Storybook removal:** Component documentation will be gone
- **Performance removal:** Web Vitals tracking will stop

## Advanced: Custom Cleanup

You can also modify `scripts/cleanup-features.js` to add your own features or customize the removal process.
