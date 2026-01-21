#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Feature definitions
const features = {
  storybook: {
    name: 'Storybook',
    description: 'Component documentation and development',
    packages: [
      '@storybook/react',
      '@storybook/react-vite',
      '@storybook/addon-a11y',
      '@storybook/addon-docs',
      '@storybook/addon-onboarding',
      '@storybook/addon-vitest',
      '@chromatic-com/storybook',
      'eslint-plugin-storybook',
      'storybook',
    ],
    files: ['.storybook', 'src/**/*.stories.tsx'],
    scripts: ['storybook', 'build-storybook'],
    envVars: [],
  },
  sentry: {
    name: 'Sentry',
    description: 'Error tracking and monitoring',
    packages: ['@sentry/react'],
    files: ['src/core/monitoring/sentry.ts'],
    scripts: [],
    envVars: ['VITE_SENTRY_DSN'],
    patches: [
      {
        file: 'src/core/monitoring/logger.ts',
        search: /Sentry\.captureException\([^)]+\)/g,
        replace: '// Sentry removed',
      },
      {
        file: 'src/core/monitoring/index.ts',
        search: /export \{ initSentry \} from '\.\/sentry'/,
        replace: '// Sentry export removed',
      },
      {
        file: 'src/config/env.ts',
        search: /VITE_SENTRY_DSN:.*\n/,
        replace: '',
      },
    ],
  },
  posthog: {
    name: 'PostHog',
    description: 'Analytics and feature flags',
    packages: ['posthog-js'],
    files: ['src/core/analytics'],
    scripts: [],
    envVars: ['VITE_POSTHOG_KEY', 'VITE_POSTHOG_HOST'],
    patches: [
      {
        file: 'src/core/feature-flags/store.ts',
        search: /import \{[^}]+\} from '\.\.\/analytics'/,
        replace: '// PostHog analytics removed',
      },
      {
        file: 'src/core/feature-flags/store.ts',
        search:
          /\/\/ Try remote flag from PostHog[\s\S]*?return remoteValue\s*\}/gm,
        replace: '// Remote flags disabled (PostHog removed)',
      },
      {
        file: 'src/core/feature-flags/store.ts',
        search:
          /\/\/ Listen for PostHog feature flags[\s\S]*?onFeatureFlagsLoaded[^}]+\}\)/gm,
        replace: '// PostHog listeners removed',
      },
      {
        file: 'src/config/env.ts',
        search: /VITE_POSTHOG_KEY:.*\n/,
        replace: '',
      },
      {
        file: 'src/config/env.ts',
        search: /VITE_POSTHOG_HOST:.*\n/,
        replace: '',
      },
    ],
  },
  msw: {
    name: 'MSW (Mock Service Worker)',
    description: 'API mocking for development and testing',
    packages: ['msw'],
    files: ['src/test/mocks', 'public/mockServiceWorker.js'],
    scripts: [],
    envVars: ['VITE_MSW_ENABLED'],
    patches: [
      {
        file: 'src/main.tsx',
        search: /async function enableMocking[\s\S]*?\n\}/,
        replace: '// MSW removed',
      },
      {
        file: 'src/main.tsx',
        search: /enableMocking\(\)\.then\(\(\) => \{/,
        replace: '',
      },
      {
        file: 'src/main.tsx',
        search: /\}\)/,
        replace: '',
      },
    ],
  },
  performance: {
    name: 'Performance Monitoring',
    description: 'Web Vitals and performance tracking',
    packages: ['web-vitals'],
    files: ['src/core/performance'],
    scripts: [],
    envVars: [],
    patches: [
      {
        file: 'src/main.tsx',
        search: /import \{ reportWebVitals \} from '@\/core\/performance'/,
        replace: '// Performance monitoring removed',
      },
      {
        file: 'src/main.tsx',
        search: /\/\/ Report Web Vitals metrics\nreportWebVitals\(\)/,
        replace: '// Performance monitoring removed',
      },
      {
        file: 'src/app/App.tsx',
        search: /import \{ PerformanceMonitor \} from '@\/core\/performance'/,
        replace: '// Performance monitoring removed',
      },
      {
        file: 'src/app/App.tsx',
        search: /<PerformanceMonitor position="bottom-left" \/>/,
        replace: '{/* Performance monitor removed */}',
      },
    ],
  },
}

// Utility functions
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function question(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function removeFiles(patterns) {
  const { globby } = await import('globby')
  const files = await globby(patterns, { cwd: rootDir, absolute: true })

  for (const file of files) {
    try {
      const stat = await fs.stat(file)
      if (stat.isDirectory()) {
        await fs.rm(file, { recursive: true, force: true })
        log(`  ✓ Removed directory: ${path.relative(rootDir, file)}`, 'green')
      } else {
        await fs.unlink(file)
        log(`  ✓ Removed file: ${path.relative(rootDir, file)}`, 'green')
      }
    } catch (error) {
      log(`  ✗ Failed to remove: ${path.relative(rootDir, file)}`, 'red')
    }
  }
}

async function removePackages(packages) {
  const packageJsonPath = path.join(rootDir, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))

  let removed = false
  for (const pkg of packages) {
    if (packageJson.dependencies?.[pkg]) {
      delete packageJson.dependencies[pkg]
      removed = true
      log(`  ✓ Removed from dependencies: ${pkg}`, 'green')
    }
    if (packageJson.devDependencies?.[pkg]) {
      delete packageJson.devDependencies[pkg]
      removed = true
      log(`  ✓ Removed from devDependencies: ${pkg}`, 'green')
    }
  }

  if (removed) {
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    )
  }
}

async function removeScripts(scripts) {
  const packageJsonPath = path.join(rootDir, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))

  let removed = false
  for (const script of scripts) {
    if (packageJson.scripts?.[script]) {
      delete packageJson.scripts[script]
      removed = true
      log(`  ✓ Removed script: ${script}`, 'green')
    }
  }

  if (removed) {
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    )
  }
}

async function removeEnvVars(vars) {
  const envPath = path.join(rootDir, '.env.example')
  if (!(await fileExists(envPath))) return

  let content = await fs.readFile(envPath, 'utf-8')
  let modified = false

  for (const varName of vars) {
    const regex = new RegExp(`^.*${varName}.*$`, 'gm')
    if (regex.test(content)) {
      content = content.replace(regex, '')
      modified = true
      log(`  ✓ Removed env var: ${varName}`, 'green')
    }
  }

  if (modified) {
    // Clean up multiple consecutive newlines
    content = content.replace(/\n{3,}/g, '\n\n')
    await fs.writeFile(envPath, content)
  }
}

async function applyPatches(patches) {
  for (const patch of patches) {
    const filePath = path.join(rootDir, patch.file)
    if (!(await fileExists(filePath))) {
      log(`  ⚠ File not found: ${patch.file}`, 'yellow')
      continue
    }

    let content = await fs.readFile(filePath, 'utf-8')
    const originalContent = content

    if (patch.search && patch.replace !== undefined) {
      content = content.replace(patch.search, patch.replace)
    }

    if (content !== originalContent) {
      await fs.writeFile(filePath, content)
      log(`  ✓ Patched: ${patch.file}`, 'green')
    }
  }
}

async function removeFeature(featureKey) {
  const feature = features[featureKey]
  log(`\n🧹 Removing ${feature.name}...`, 'cyan')

  // Remove files
  if (feature.files.length > 0) {
    log('  Removing files...', 'blue')
    await removeFiles(feature.files)
  }

  // Remove packages
  if (feature.packages.length > 0) {
    log('  Removing packages...', 'blue')
    await removePackages(feature.packages)
  }

  // Remove scripts
  if (feature.scripts.length > 0) {
    log('  Removing scripts...', 'blue')
    await removeScripts(feature.scripts)
  }

  // Remove env vars
  if (feature.envVars.length > 0) {
    log('  Removing environment variables...', 'blue')
    await removeEnvVars(feature.envVars)
  }

  // Apply patches
  if (feature.patches?.length > 0) {
    log('  Applying patches...', 'blue')
    await applyPatches(feature.patches)
  }

  log(`✅ ${feature.name} removed successfully!`, 'green')
}

async function showMenu() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan')
  log('║       🧹 Boilerplate Feature Cleanup Script           ║', 'cyan')
  log('╚════════════════════════════════════════════════════════╝', 'cyan')

  log('\nAvailable features to remove:\n', 'yellow')

  const featureKeys = Object.keys(features)
  featureKeys.forEach((key, index) => {
    const feature = features[key]
    log(`  ${index + 1}. ${feature.name}`, 'blue')
    log(`     ${feature.description}`, 'reset')
  })

  log('\n  0. Remove all features', 'red')
  log('  q. Quit\n', 'yellow')
}

async function main() {
  try {
    await showMenu()

    const answer = await question(
      'Enter feature number(s) to remove (comma-separated): '
    )

    if (answer.toLowerCase() === 'q') {
      log('Cancelled.', 'yellow')
      return
    }

    let featuresToRemove = []

    if (answer.trim() === '0') {
      const confirm = await question(
        '⚠️  Are you sure you want to remove ALL features? (yes/no): '
      )
      if (confirm.toLowerCase() !== 'yes') {
        log('Cancelled.', 'yellow')
        return
      }
      featuresToRemove = Object.keys(features)
    } else {
      const selections = answer.split(',').map((s) => s.trim())
      const featureKeys = Object.keys(features)

      for (const selection of selections) {
        const index = parseInt(selection, 10) - 1
        if (index >= 0 && index < featureKeys.length) {
          featuresToRemove.push(featureKeys[index])
        }
      }
    }

    if (featuresToRemove.length === 0) {
      log('No features selected.', 'yellow')
      return
    }

    log('\nSelected features to remove:', 'cyan')
    featuresToRemove.forEach((key) => {
      log(`  - ${features[key].name}`, 'blue')
    })

    const confirm = await question('\nProceed? (yes/no): ')
    if (confirm.toLowerCase() !== 'yes') {
      log('Cancelled.', 'yellow')
      return
    }

    // Remove features
    for (const featureKey of featuresToRemove) {
      await removeFeature(featureKey)
    }

    log('\n✨ Cleanup completed!', 'green')
    log('\n📦 Next steps:', 'yellow')
    log('  1. Run: pnpm install (to update lockfile)', 'blue')
    log('  2. Run: pnpm lint (to check for issues)', 'blue')
    log('  3. Run: pnpm typecheck (to verify types)', 'blue')
    log('  4. Run: pnpm test (to run tests)', 'blue')
    log('  5. Commit changes\n', 'blue')
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red')
    process.exit(1)
  }
}

main()
