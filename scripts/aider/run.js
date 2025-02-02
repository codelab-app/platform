#!/usr/bin/env node

// Load environment variables first
require('./load-env.js')

// Get all arguments passed to this script
const args = process.argv.slice(2)

// Spawn aider process with all arguments
const { spawnSync } = require('child_process')
const result = spawnSync('aider', args, {
  stdio: 'inherit',
})

// Exit with the same code as aider
process.exit(result.status)
