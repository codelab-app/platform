#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Define the path to our main script
const manageDepsScript = path.join(__dirname, 'manage-package-json.js')

// Test that the script exists
if (!fs.existsSync(manageDepsScript)) {
  console.error(`❌ Script not found: ${manageDepsScript}`)
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

// Test help command
console.log('🧪 Testing command help output...')
if (!runCommand(`node ${manageDepsScript} --help`)) {
  process.exit(1)
}

// Test validate command with dry run
console.log('🧪 Testing validate command...')
if (!runCommand(`node ${manageDepsScript} validate --verbose`)) {
  process.exit(1)
}

// Test update-single command with dry run on the root package.json
console.log('🧪 Testing update-single command with dry run...')
if (
  !runCommand(
    `node ${manageDepsScript} update-single ./package.json --dry-run --verbose`,
  )
) {
  process.exit(1)
}

// Test full-process command with dry run
console.log('🧪 Testing full-process command with dry run...')
if (!runCommand(`node ${manageDepsScript} full-process --dry-run --verbose`)) {
  process.exit(1)
}

console.log('\n✅ All tests passed!')
