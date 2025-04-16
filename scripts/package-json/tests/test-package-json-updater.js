#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { updateLibraryPackageJson } from './package-json-updater.js'

/**
 * Test script for the package.json updater
 * Tests updating both existing and non-existing package.json files
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define test libraries
const TEST_LIBRARIES = [
  // Test with existing package.json
  {
    type: 'application',
    name: 'builder',
    path: path.join(
      __dirname,
      '..',
      'libs',
      'frontend',
      'application',
      'builder',
    ),
    description: 'Library with existing package.json',
  },
  // Test creating a new package.json
  {
    type: 'application',
    name: 'element',
    path: path.join(
      __dirname,
      '..',
      'libs',
      'frontend',
      'application',
      'element',
    ),
    description: 'Library possibly without package.json',
  },
]

// Function to ensure package.json exists
const checkPackageJsonExists = (libraryPath) => {
  const packageJsonPath = path.join(libraryPath, 'package.json')
  return fs.existsSync(packageJsonPath)
}

// Function to backup package.json if it exists
const backupPackageJson = (libraryPath) => {
  const packageJsonPath = path.join(libraryPath, 'package.json')
  const backupPath = path.join(libraryPath, 'package.json.bak')

  if (fs.existsSync(packageJsonPath)) {
    console.log(`Backing up ${packageJsonPath} to ${backupPath}`)
    fs.copyFileSync(packageJsonPath, backupPath)
    return true
  }

  return false
}

// Function to restore package.json from backup
const restorePackageJson = (libraryPath) => {
  const packageJsonPath = path.join(libraryPath, 'package.json')
  const backupPath = path.join(libraryPath, 'package.json.bak')

  if (fs.existsSync(backupPath)) {
    console.log(`Restoring ${packageJsonPath} from ${backupPath}`)
    fs.copyFileSync(backupPath, packageJsonPath)
    fs.unlinkSync(backupPath)
    return true
  }

  return false
}

// Main test function
const runTests = async () => {
  console.log('Starting package.json updater tests\n')

  const results = []
  const backups = {}

  try {
    // Process each test library
    for (const lib of TEST_LIBRARIES) {
      console.log(
        `Testing with library: ${lib.type}/${lib.name} (${lib.description})`,
      )

      // Check if package.json exists before testing
      const hasPackageJson = checkPackageJsonExists(lib.path)
      console.log(`Package.json exists before test: ${hasPackageJson}`)

      // Backup existing package.json if it exists
      backups[lib.path] = backupPackageJson(lib.path)

      // Test with dry run first
      console.log('\nRunning dry run test:')
      const dryRunResult = updateLibraryPackageJson(lib.path, {
        dryRun: true,
        verbose: true,
        useCache: true,
      })

      console.log('Dry run result:', dryRunResult)

      // Now run actual update
      console.log('\nRunning actual update test:')
      const updateResult = updateLibraryPackageJson(lib.path, {
        verbose: true,
        useCache: true,
      })

      console.log('Update result:', updateResult)

      // Verify package.json exists after test
      const packageJsonExists = checkPackageJsonExists(lib.path)
      console.log(`Package.json exists after test: ${packageJsonExists}`)

      // Add to results
      results.push({
        library: `${lib.type}/${lib.name}`,
        hadPackageJsonBefore: hasPackageJson,
        hasPackageJsonAfter: packageJsonExists,
        dryRunSuccess: dryRunResult.success,
        updateSuccess: updateResult.success,
        dependenciesAdded: updateResult.dependenciesAdded,
        totalDependencies: updateResult.totalDependencies,
      })

      console.log('\n' + '-'.repeat(50) + '\n')
    }

    // Print summary of all tests
    console.log('TEST SUMMARY:')
    console.table(results)

    // Check if all tests were successful
    const allSuccessful = results.every((r) => r.updateSuccess)
    console.log(
      `\nOverall test result: ${allSuccessful ? 'SUCCESS' : 'FAILURE'}`,
    )
  } catch (error) {
    console.error('Error during tests:', error)
  } finally {
    // Restore all backups
    console.log('\nRestoring backups:')
    for (const [libPath, hasBackup] of Object.entries(backups)) {
      if (hasBackup) {
        restorePackageJson(libPath)
      } else {
        // If it didn't have a backup but now has a package.json, remove the newly created one
        const packageJsonPath = path.join(libPath, 'package.json')
        if (fs.existsSync(packageJsonPath)) {
          console.log(`Removing newly created ${packageJsonPath}`)
          fs.unlinkSync(packageJsonPath)
        }
      }
    }
  }
}

// Run the tests
runTests().catch((error) => {
  console.error('Unhandled error during tests:', error)
  process.exit(1)
})
