#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Define paths
const SCRIPT_DIR = __dirname
const PACKAGE_JSON_DIR = path.resolve(SCRIPT_DIR, '..')
const MAIN_SCRIPT = path.join(PACKAGE_JSON_DIR, 'index.js')

// Make sure the script exists
if (!fs.existsSync(MAIN_SCRIPT)) {
  console.error(`❌ Main script not found: ${MAIN_SCRIPT}`)
  process.exit(1)
}

// Helper function to run commands
const runCommand = (cmd) => {
  console.log(`\n🔄 Running: ${cmd}`)
  try {
    const output = execSync(cmd, { encoding: 'utf8' })
    console.log(output)
    return true
  } catch (error) {
    console.error(`❌ Command failed: ${cmd}`)
    console.error(error.message)
    return false
  }
}

// Run tests
console.log('🧪 Starting package.json tool tests...')

// Test help command
console.log('\n🧪 Testing command help output...')
if (!runCommand(`node ${MAIN_SCRIPT} --help`)) {
  process.exit(1)
}

// Test validate command
console.log('\n🧪 Testing validate command...')
if (!runCommand(`node ${MAIN_SCRIPT} validate --verbose`)) {
  process.exit(1)
}

// Test update-single command with dry run on the root package.json
console.log('\n🧪 Testing update-single command with dry run...')
const rootPackageJson = path.resolve(process.cwd(), 'package.json')
if (
  !runCommand(
    `node ${MAIN_SCRIPT} update-single ${rootPackageJson} --dry-run --verbose`,
  )
) {
  process.exit(1)
}

// Test full-process command with dry run
console.log('\n🧪 Testing full-process command with dry run...')
if (!runCommand(`node ${MAIN_SCRIPT} full-process --dry-run --verbose`)) {
  process.exit(1)
}

console.log('\n✅ All tests passed!')
