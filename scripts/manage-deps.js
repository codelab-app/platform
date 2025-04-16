#!/usr/bin/env node

/**
 * This is a redirector script for backward compatibility.
 * It simply forwards all arguments to the new implementation in
 * scripts/package-json/index.js
 */

import { spawnSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get the path to the real implementation
const implementationPath = path.resolve(__dirname, 'package-json/index.js')

// Forward all arguments to the implementation
const result = spawnSync(
  'node',
  [implementationPath, ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: process.env,
  },
)

// Exit with the same code as the implementation
process.exit(result.status)
