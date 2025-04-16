#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  readPackageJson,
  createPackageJsonTemplate,
  writePackageJson,
  isInternalPackage,
  getAllInternalPackages,
  mergeDependencies,
} from './package-json-reader-writer.js'
import { analyzeLibrary } from './library-analyzer.js'

/**
 * Package.json updater script
 *
 * Takes the output from the library analyzer and updates the library's package.json
 * with the analyzed dependencies.
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Updates a library's package.json with the analyzed dependencies
 * @param {string} libraryPath - Path to the library
 * @param {Object} options - Options for the update
 * @param {boolean} options.dryRun - If true, don't actually write the file
 * @param {boolean} options.verbose - If true, log more details
 * @param {boolean} options.useCache - If true, use cached imports.json for analysis
 * @returns {Object} - Result of the update operation
 */
export const updateLibraryPackageJson = (libraryPath, options = {}) => {
  const { dryRun = false, verbose = false, useCache = true } = options

  try {
    // Ensure libraryPath is an absolute path
    const absoluteLibraryPath = path.isAbsolute(libraryPath)
      ? libraryPath
      : path.resolve(process.cwd(), libraryPath)

    // Track metrics for reporting
    const metrics = {
      startTime: new Date(),
      libraryPath: absoluteLibraryPath,
      libraryName: path.basename(absoluteLibraryPath),
      hasExistingPackageJson: false,
      dependenciesAdded: 0,
      dependenciesUpdated: 0,
      success: false,
    }

    if (verbose) {
      console.log(`Updating package.json for ${absoluteLibraryPath}`)
    }

    // Check if the package.json file exists
    const packageJsonPath = path.join(absoluteLibraryPath, 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      console.error(`No package.json found at ${packageJsonPath}`)
      return {
        success: false,
        libraryName: metrics.libraryName,
        libraryPath: absoluteLibraryPath,
        error: `Package.json file not found`,
        dryRun,
      }
    }

    // Step 1: Analyze the library to get dependencies
    const analysisResult = analyzeLibrary(absoluteLibraryPath, { useCache })

    if (verbose) {
      console.log(
        `Analysis found ${analysisResult.dependencies.total} dependencies`,
      )
    }

    // Get the classified dependencies
    const { internal: internalDeps, external: externalDeps } =
      analysisResult.classifiedDependencies

    // Step 2: Read existing package.json or create template
    let packageJson = readPackageJson(absoluteLibraryPath)
    metrics.hasExistingPackageJson = packageJson !== null

    if (!packageJson) {
      if (verbose) {
        console.log(`No existing package.json found, creating a new one`)
      }
      packageJson = createPackageJsonTemplate(absoluteLibraryPath)
    } else if (verbose) {
      console.log(`Found existing package.json`)
    }

    // Ensure devDependencies exists
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {}
    }

    // Step 3: Format dependencies for package.json
    const formattedDeps = {}

    // Add internal dependencies with "workspace:*"
    Object.keys(internalDeps).forEach((dep) => {
      formattedDeps[dep] = 'workspace:*'
    })

    // Add external dependencies with existing versions if available
    Object.keys(externalDeps).forEach((dep) => {
      if (
        packageJson.devDependencies[dep] &&
        packageJson.devDependencies[dep] !== '*'
      ) {
        // Keep existing version if it's not a wildcard
        formattedDeps[dep] = packageJson.devDependencies[dep]
      } else {
        // Otherwise use whatever was in the analysis
        formattedDeps[dep] = externalDeps[dep] || '*'
      }
    })

    // Step 4: Merge with existing dependencies, preserving versions
    const existingDeps = { ...packageJson.devDependencies }
    const mergedDeps = { ...existingDeps, ...formattedDeps }

    // Count metrics
    metrics.dependenciesAdded = Object.keys(formattedDeps).filter(
      (dep) => !existingDeps[dep],
    ).length

    metrics.dependenciesUpdated = Object.keys(formattedDeps).filter(
      (dep) => existingDeps[dep] && existingDeps[dep] !== formattedDeps[dep],
    ).length

    // Update the package.json object
    packageJson.devDependencies = mergedDeps

    // Sort dependencies alphabetically
    packageJson.devDependencies = Object.fromEntries(
      Object.entries(packageJson.devDependencies).sort(([keyA], [keyB]) =>
        keyA.localeCompare(keyB),
      ),
    )

    // Step 5: Write the updated package.json if not a dry run
    if (!dryRun) {
      const writeResult = writePackageJson(absoluteLibraryPath, packageJson)
      metrics.success = writeResult

      if (verbose) {
        if (writeResult) {
          console.log(`Successfully wrote package.json`)
        } else {
          console.error(`Failed to write package.json`)
        }
      }
    } else {
      metrics.success = true
      if (verbose) {
        console.log(`Dry run - not writing package.json`)
        console.log(`Would write:`, JSON.stringify(packageJson, null, 2))
      }
    }

    // Calculate duration
    metrics.endTime = new Date()
    metrics.duration = metrics.endTime - metrics.startTime

    return {
      success: metrics.success,
      libraryName: metrics.libraryName,
      libraryPath: absoluteLibraryPath,
      packageJsonCreated: !metrics.hasExistingPackageJson && metrics.success,
      dependenciesAdded: metrics.dependenciesAdded,
      dependenciesUpdated: metrics.dependenciesUpdated,
      totalDependencies: Object.keys(packageJson.devDependencies).length,
      dryRun,
      error: null,
    }
  } catch (error) {
    console.error(`Error updating package.json for ${libraryPath}:`, error)
    return {
      success: false,
      libraryName: path.basename(libraryPath),
      libraryPath,
      error: error.message,
      dryRun,
    }
  }
}

/**
 * Main function to run from CLI
 */
const main = async () => {
  // Parse command line arguments
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Error: Library path is required')
    console.log(
      'Usage: node package-json-updater.js <libraryPath> [--dry-run] [--verbose] [--no-cache]',
    )
    process.exit(1)
  }

  // Run the updater
  const libraryPath = args[0]
  const options = {
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose'),
    useCache: !args.includes('--no-cache'),
  }

  const result = updateLibraryPackageJson(libraryPath, options)

  // Output results
  if (result.success) {
    console.log(
      `✅ Successfully ${
        options.dryRun ? 'processed' : 'updated'
      } package.json for ${result.libraryName}`,
    )
    console.log(
      `   - ${
        result.packageJsonCreated
          ? 'Created new package.json'
          : 'Updated existing package.json'
      }`,
    )
    console.log(`   - Added ${result.dependenciesAdded} new dependencies`)
    console.log(
      `   - Updated ${result.dependenciesUpdated} existing dependencies`,
    )
    console.log(`   - Total dependencies: ${result.totalDependencies}`)
  } else {
    console.error(`❌ Failed to update package.json for ${result.libraryName}`)
    if (result.error) {
      console.error(`   Error: ${result.error}`)
    }
    process.exit(1)
  }
}

// Run the CLI if this file is executed directly
// Only run when directly executed as a script, not when imported
if (import.meta.url.endsWith('package-json-updater.js')) {
  main().catch((error) => {
    console.error('Unhandled error:', error)
    process.exit(1)
  })
}
