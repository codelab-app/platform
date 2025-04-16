#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { analyzeLibrary } from '../core/library-analyzer.js'
import { readPackageJson } from '../core/package-json-reader-writer.js'

/**
 * Script to validate dependencies across all libraries
 * Checks for duplicate dependencies, missing dependencies, and format consistency
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths to JSON files
const LIBRARIES_FILE = path.join(__dirname, 'libraries.json')
const IMPORTS_FILE = path.join(__dirname, 'imports.json')
const VALIDATION_REPORT_FILE = path.join(__dirname, 'validation-report.json')

/**
 * Validate a single library's package.json file
 * @param {string} libraryPath - Path to the library
 * @param {Object} options - Validation options
 * @returns {Object} - Validation results
 */
const validateLibrary = (libraryPath, options = {}) => {
  const { verbose = false, useCache = true } = options
  const libraryName = path.basename(libraryPath)
  const results = {
    libraryPath,
    libraryName,
    packageJsonExists: false,
    format: { valid: true, issues: [] },
    dependencies: {
      duplicates: [],
      missing: [],
      unnecessary: [],
      total: 0,
    },
    success: false,
    errors: [],
  }

  try {
    if (verbose) {
      console.log(`Validating library: ${libraryName} (${libraryPath})`)
    }

    // Check if package.json exists
    const packageJsonPath = path.join(libraryPath, 'package.json')
    results.packageJsonExists = fs.existsSync(packageJsonPath)

    if (!results.packageJsonExists) {
      results.errors.push('Package.json file does not exist')
      return results
    }

    // Read package.json
    const packageJson = readPackageJson(libraryPath)
    if (!packageJson) {
      results.errors.push('Failed to read package.json file')
      return results
    }

    // Check package.json format
    validatePackageJsonFormat(packageJson, results)

    // Get actual imports by analyzing source files
    const analysisResult = analyzeLibrary(libraryPath, { useCache })
    const actualImports = new Set()

    // Get the classified dependencies from analysis
    const { internal: internalDeps, external: externalDeps } =
      analysisResult.classifiedDependencies

    // Combined all actual dependencies from analysis
    Object.keys(internalDeps).forEach((dep) => actualImports.add(dep))
    Object.keys(externalDeps).forEach((dep) => actualImports.add(dep))

    // Get declared dependencies from package.json
    const declaredDeps = new Set(Object.keys(packageJson.devDependencies || {}))
    results.dependencies.total = declaredDeps.size

    // Check for missing dependencies (in actual imports but not in package.json)
    for (const dep of actualImports) {
      if (!declaredDeps.has(dep)) {
        results.dependencies.missing.push(dep)
      }
    }

    // Check for unnecessary dependencies (in package.json but not in actual imports)
    for (const dep of declaredDeps) {
      // Only consider @codelab packages as potentially unnecessary
      // External packages might be used in ways our analyzer can't detect
      if (dep.startsWith('@codelab/') && !actualImports.has(dep)) {
        results.dependencies.unnecessary.push(dep)
      }
    }

    // Check for duplicate dependencies
    const devDeps = packageJson.devDependencies || {}
    validateDuplicates(devDeps, results)

    // Set success flag if no errors or issues found
    results.success =
      results.errors.length === 0 &&
      results.dependencies.duplicates.length === 0 &&
      results.dependencies.missing.length === 0 &&
      results.format.valid

    return results
  } catch (error) {
    console.error(`Error validating library ${libraryPath}:`, error)
    results.errors.push(error.message)
    return results
  }
}

/**
 * Validate the format of a package.json object
 * @param {Object} packageJson - The package.json object
 * @param {Object} results - Results object to update with issues
 */
const validatePackageJsonFormat = (packageJson, results) => {
  // Check for required fields
  const requiredFields = ['name', 'exports', 'devDependencies']

  for (const field of requiredFields) {
    if (!packageJson[field]) {
      results.format.valid = false
      results.format.issues.push(`Missing required field: ${field}`)
    }
  }

  // Check if name follows the pattern @codelab/xxx-xxx-xxx
  if (packageJson.name && typeof packageJson.name === 'string') {
    if (!packageJson.name.startsWith('@codelab/')) {
      results.format.valid = false
      results.format.issues.push(
        `Name should start with @codelab/: ${packageJson.name}`,
      )
    }
  }

  // Check exports format (should have default, import, and types)
  if (packageJson.exports && packageJson.exports['.']) {
    const exportSection = packageJson.exports['.']
    const requiredExportFields = ['default', 'import', 'types']

    for (const field of requiredExportFields) {
      if (!exportSection[field]) {
        results.format.valid = false
        results.format.issues.push(`Missing required export field: ${field}`)
      }
    }
  } else if (packageJson.exports) {
    results.format.valid = false
    results.format.issues.push('Exports section should contain a "." entry')
  }

  // Check devDependencies format (internal should be "workspace:*")
  if (packageJson.devDependencies) {
    for (const [dep, version] of Object.entries(packageJson.devDependencies)) {
      if (dep.startsWith('@codelab/') && version !== 'workspace:*') {
        results.format.valid = false
        results.format.issues.push(
          `Internal dependency ${dep} should have version "workspace:*" but has "${version}"`,
        )
      }
    }
  }
}

/**
 * Check for duplicate dependencies in a devDependencies object
 * @param {Object} devDeps - The devDependencies object
 * @param {Object} results - Results object to update with issues
 */
const validateDuplicates = (devDeps, results) => {
  // Convert dependency names to a map of base names without scope
  const baseNameMap = new Map()

  for (const dep of Object.keys(devDeps)) {
    // Extract the base name (e.g., 'element' from '@codelab/frontend-application-element')
    let baseName = dep

    if (dep.startsWith('@codelab/')) {
      const parts = dep.split('/')
      if (parts.length === 2) {
        const nameParts = parts[1].split('-')
        baseName = nameParts[nameParts.length - 1]
      }
    }

    // Add to map or add to duplicates
    if (baseNameMap.has(baseName)) {
      const existing = baseNameMap.get(baseName)

      // Only consider @codelab dependencies for duplication
      if (dep.startsWith('@codelab/') && existing.startsWith('@codelab/')) {
        results.dependencies.duplicates.push({
          baseName,
          dependencies: [existing, dep],
        })
      }
    } else {
      baseNameMap.set(baseName, dep)
    }
  }
}

/**
 * Validate all libraries and generate a report
 * @param {Object} options - Validation options
 * @returns {Object} - Validation report
 */
const validateAllLibraries = (options = {}) => {
  const startTime = Date.now()

  try {
    console.log('Starting library dependency validation...')

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
    let librariesToValidate = allLibraries
    if (options.filter) {
      const filterRegex = new RegExp(options.filter, 'i')
      librariesToValidate = allLibraries.filter((libPath) =>
        filterRegex.test(libPath),
      )
      console.log(
        `Filtered down to ${librariesToValidate.length} libraries matching "${options.filter}"`,
      )
    }

    // Set up the report structure
    const report = {
      timestamp: new Date().toISOString(),
      options,
      summary: {
        totalLibraries: librariesToValidate.length,
        validated: 0,
        successful: 0,
        withIssues: 0,
        missing: 0,
        issues: {
          format: 0,
          duplicates: 0,
          missing: 0,
          unnecessary: 0,
        },
      },
      results: [],
    }

    // Validate each library
    for (const libraryPath of librariesToValidate) {
      const result = validateLibrary(libraryPath, options)
      report.results.push(result)
      report.summary.validated++

      // Update summary statistics
      if (result.success) {
        report.summary.successful++
      } else {
        report.summary.withIssues++

        if (!result.packageJsonExists) {
          report.summary.missing++
        }

        if (!result.format.valid) {
          report.summary.issues.format++
        }

        if (result.dependencies.duplicates.length > 0) {
          report.summary.issues.duplicates++
        }

        if (result.dependencies.missing.length > 0) {
          report.summary.issues.missing++
        }

        if (result.dependencies.unnecessary.length > 0) {
          report.summary.issues.unnecessary++
        }
      }
    }

    // Calculate execution time
    const executionTime = (Date.now() - startTime) / 1000
    report.executionTime = executionTime

    // Save the report
    if (options.saveReport) {
      fs.writeFileSync(VALIDATION_REPORT_FILE, JSON.stringify(report, null, 2))
      console.log(`\nReport saved to ${VALIDATION_REPORT_FILE}`)
    }

    // Print summary
    console.log('\nValidation Summary:')
    console.log(`  Total libraries: ${report.summary.totalLibraries}`)
    console.log(`  Successfully validated: ${report.summary.successful}`)
    console.log(`  Libraries with issues: ${report.summary.withIssues}`)
    console.log(`  Missing package.json: ${report.summary.missing}`)
    console.log('\nIssues found:')
    console.log(`  Format issues: ${report.summary.issues.format}`)
    console.log(`  Duplicate dependencies: ${report.summary.issues.duplicates}`)
    console.log(`  Missing dependencies: ${report.summary.issues.missing}`)
    console.log(
      `  Unnecessary dependencies: ${report.summary.issues.unnecessary}`,
    )
    console.log(`\nExecution time: ${executionTime.toFixed(2)} seconds`)

    return report
  } catch (error) {
    console.error('Error in validation:', error)
    return {
      timestamp: new Date().toISOString(),
      options,
      error: error.message,
      summary: {
        totalLibraries: 0,
        validated: 0,
        successful: 0,
        withIssues: 0,
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
    verbose: false,
    useCache: true,
    saveReport: true,
    filter: null,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
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
Validate Dependencies - Check all library package.json files for issues

Usage: node validate-dependencies.js [options]

Options:
  --verbose, -v       Show detailed output for each library
  --no-cache          Don't use cached imports.json, analyze source files directly
  --no-report         Don't save report to validation-report.json
  --filter, -f REGEX  Only validate libraries matching regex pattern
  --help, -h          Show this help message

Examples:
  node validate-dependencies.js
  node validate-dependencies.js --verbose
  node validate-dependencies.js --filter application/builder
  `)
}

// Run the script if it's called directly
if (import.meta.url === `file://${__filename}`) {
  const options = parseArgs()
  validateAllLibraries(options)
}

// Export the functions for use in other modules
export { validateLibrary, validateAllLibraries }
