#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { analyzeLibrary } from '../core/library-analyzer.js'
import { updateLibraryPackageJson } from '../core/package-json-updater.js'

/**
 * Script to process all libraries in batch, analyzing dependencies
 * and updating package.json files
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the libraries.json file (output from analyze-project-structure.js)
const LIBRARIES_FILE = path.join(__dirname, 'libraries.json')

// Output file for batch processing report
const REPORT_FILE = path.join(__dirname, 'batch-process-report.json')

/**
 * Process a single library using the library analyzer and package.json updater
 * @param {string} libraryPath - Path to the library
 * @param {Object} options - Processing options
 * @returns {Object} - Processing result
 */
const processLibrary = (libraryPath, options = {}) => {
  try {
    const libraryName = path.basename(libraryPath)
    console.log(`\nProcessing library: ${libraryName} (${libraryPath})`)

    // Analyze the library to get dependencies
    const analysis = analyzeLibrary(libraryPath, {
      useCache: options.useCache,
      detailedOutput: options.verbose,
    })

    console.log(
      `  Found dependencies: ${analysis.dependencies.total} (${analysis.dependencies.internal} internal, ${analysis.dependencies.external} external)`,
    )

    // Get the classified dependencies
    const { internal: internalDeps, external: externalDeps } =
      analysis.classifiedDependencies

    // Update the package.json file
    const packageJsonPath = path.join(libraryPath, 'package.json')
    const packageExists = fs.existsSync(packageJsonPath)

    if (options.dryRun) {
      console.log(
        `  [DRY RUN] Would ${
          packageExists ? 'update' : 'create'
        } package.json with ${
          Object.keys(internalDeps).length + Object.keys(externalDeps).length
        } dependencies`,
      )
      return {
        libraryPath,
        libraryName,
        success: true,
        dryRun: true,
        packageExists,
        dependencies: analysis.dependencies,
      }
    }

    // Create or update package.json
    const allDeps = { ...internalDeps, ...externalDeps }
    const result = updateLibraryPackageJson(libraryPath, {
      dryRun: options.dryRun,
      verbose: options.verbose,
      useCache: options.useCache,
    })

    return {
      libraryPath,
      libraryName,
      success: result.success,
      packageExists,
      dependencies: analysis.dependencies,
      errors: result.error ? [result.error] : [],
    }
  } catch (error) {
    console.error(`Error processing library ${libraryPath}:`, error)
    return {
      libraryPath,
      libraryName: path.basename(libraryPath),
      success: false,
      errors: [error.message],
      dependencies: { internal: 0, external: 0, total: 0 },
    }
  }
}

/**
 * Process all libraries in batch
 * @param {Object} options - Processing options
 * @returns {Object} - Batch processing report
 */
const batchProcessLibraries = (options = {}) => {
  const startTime = Date.now()

  try {
    console.log('Starting batch processing of libraries...')
    console.log(`Options: ${JSON.stringify(options)}`)

    // Check if libraries.json exists
    if (!fs.existsSync(LIBRARIES_FILE)) {
      throw new Error(
        `${LIBRARIES_FILE} not found. Please run analyze-project-structure.js first.`,
      )
    }

    // Read libraries from the JSON file
    const libraries = JSON.parse(fs.readFileSync(LIBRARIES_FILE, 'utf8'))
    const allLibraries = [...libraries.application, ...libraries.domain]

    // Filter libraries if specified
    let librariesToProcess = allLibraries
    if (options.filter) {
      const filterRegex = new RegExp(options.filter, 'i')
      librariesToProcess = allLibraries.filter((libPath) =>
        filterRegex.test(libPath),
      )
      console.log(
        `Filtered down to ${librariesToProcess.length} libraries matching "${options.filter}"`,
      )
    }

    // Set up the report structure
    const report = {
      timestamp: new Date().toISOString(),
      options,
      summary: {
        totalLibraries: librariesToProcess.length,
        processed: 0,
        successful: 0,
        failed: 0,
        packageJsonCreated: 0,
        packageJsonUpdated: 0,
        totalDependencies: {
          internal: 0,
          external: 0,
          total: 0,
        },
      },
      results: [],
    }

    // Process each library
    for (const libraryPath of librariesToProcess) {
      const result = processLibrary(libraryPath, options)
      report.results.push(result)
      report.summary.processed++

      // Update summary statistics
      if (result.success) {
        report.summary.successful++
        if (result.packageExists) {
          report.summary.packageJsonUpdated++
        } else {
          report.summary.packageJsonCreated++
        }
        report.summary.totalDependencies.internal +=
          result.dependencies.internal
        report.summary.totalDependencies.external +=
          result.dependencies.external
        report.summary.totalDependencies.total += result.dependencies.total
      } else {
        report.summary.failed++
      }
    }

    // Calculate execution time
    const executionTime = (Date.now() - startTime) / 1000
    report.executionTime = executionTime

    // Save the report
    if (!options.dryRun && options.saveReport) {
      fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2))
      console.log(`\nReport saved to ${REPORT_FILE}`)
    }

    // Print summary
    console.log('\nBatch Processing Summary:')
    console.log(`  Total libraries: ${report.summary.totalLibraries}`)
    console.log(`  Successfully processed: ${report.summary.successful}`)
    console.log(`  Failed: ${report.summary.failed}`)
    console.log(
      `  Package.json files created: ${report.summary.packageJsonCreated}`,
    )
    console.log(
      `  Package.json files updated: ${report.summary.packageJsonUpdated}`,
    )
    console.log(
      `  Total dependencies added: ${report.summary.totalDependencies.total}`,
    )
    console.log(`    Internal: ${report.summary.totalDependencies.internal}`)
    console.log(`    External: ${report.summary.totalDependencies.external}`)
    console.log(`  Execution time: ${executionTime.toFixed(2)} seconds`)

    return report
  } catch (error) {
    console.error('Error in batch processing:', error)
    return {
      timestamp: new Date().toISOString(),
      options,
      error: error.message,
      summary: {
        totalLibraries: 0,
        processed: 0,
        successful: 0,
        failed: 0,
      },
      results: [],
      executionTime: (Date.now() - startTime) / 1000,
    }
  }
}

/**
 * Parse command line arguments
 * @returns {Object} - Parsed options
 */
const parseArgs = () => {
  const args = process.argv.slice(2)
  const options = {
    dryRun: false,
    verbose: false,
    useCache: true,
    saveReport: true,
    filter: null,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '--dry-run':
      case '-d':
        options.dryRun = true
        break
      case '--verbose':
      case '-v':
        options.verbose = true
        break
      case '--no-cache':
        options.useCache = false
        break
      case '--no-report':
        options.saveReport = false
        break
      case '--filter':
      case '-f':
        if (i + 1 < args.length) {
          options.filter = args[++i]
        }
        break
      case '--help':
      case '-h':
        showHelp()
        process.exit(0)
        break
    }
  }

  return options
}

/**
 * Show help message
 */
const showHelp = () => {
  console.log(`
Batch Process Libraries - Process all libraries to update package.json dependencies

Usage: node batch-process-libraries.js [options]

Options:
  --dry-run, -d       Run without making changes to package.json files
  --verbose, -v       Show detailed output including all dependencies
  --no-cache          Don't use cached imports.json, analyze source files directly
  --no-report         Don't save report to batch-process-report.json
  --filter, -f REGEX  Only process libraries matching regex pattern
  --help, -h          Show this help message

Examples:
  node batch-process-libraries.js
  node batch-process-libraries.js --dry-run
  node batch-process-libraries.js --filter application/builder
  `)
}

// Run the script if it's called directly
if (import.meta.url === `file://${__filename}`) {
  const options = parseArgs()
  batchProcessLibraries(options)
}

// Export the function for use in other modules
export { batchProcessLibraries }
