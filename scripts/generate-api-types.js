#!/usr/bin/env node
/**
 * API Type Generation Script
 *
 * Generates TypeScript types from OpenAPI specification.
 *
 * Usage:
 *   pnpm generate:api-types                    # Use default openapi.yaml
 *   pnpm generate:api-types ./path/to/spec.yaml  # Custom spec file
 *   pnpm generate:api-types https://api.example.com/openapi.json  # Remote spec
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

// Default paths
const DEFAULT_SPEC = resolve(rootDir, 'openapi.yaml')
const EXAMPLE_SPEC = resolve(rootDir, 'openapi.example.yaml')
const OUTPUT_FILE = resolve(rootDir, 'src/api-types/schema.d.ts')

// Get spec path from args or use default
const specPath = process.argv[2] || (existsSync(DEFAULT_SPEC) ? DEFAULT_SPEC : EXAMPLE_SPEC)

// Check if spec exists (for local files)
if (!specPath.startsWith('http') && !existsSync(specPath)) {
  console.error(`❌ OpenAPI spec not found: ${specPath}`)
  console.error('')
  console.error('To get started:')
  console.error('  1. Copy openapi.example.yaml to openapi.yaml')
  console.error('  2. Update with your actual API specification')
  console.error('  3. Run: pnpm generate:api-types')
  console.error('')
  console.error('Or provide a remote URL:')
  console.error('  pnpm generate:api-types https://api.example.com/openapi.json')
  process.exit(1)
}

console.log('🔄 Generating API types...')
console.log(`   Spec: ${specPath}`)
console.log(`   Output: ${OUTPUT_FILE}`)

try {
  execSync(`npx openapi-typescript "${specPath}" -o "${OUTPUT_FILE}"`, {
    cwd: rootDir,
    stdio: 'inherit',
  })
  console.log('✅ API types generated successfully!')
} catch (error) {
  console.error('❌ Failed to generate API types')
  process.exit(1)
}
