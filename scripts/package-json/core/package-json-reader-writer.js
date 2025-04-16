#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Script to read, create, and write package.json files
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the libraries.json file (output from analyze-project-structure.js)
const LIBRARIES_FILE = path.join(__dirname, 'libraries.json')

/**
 * Ensure a path is absolute
 * @param {string} inputPath - Path to normalize
 * @returns {string} - Absolute path
 */
export const toAbsolutePath = (inputPath) => {
  return path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(process.cwd(), inputPath)
}

/**
 * Reads a package.json file from the specified path
 * @param {string} libraryPath - Path to the library directory
 * @returns {Object|null} - The parsed package.json content or null if not found
 */
export const readPackageJson = (libraryPath) => {
  try {
    // Ensure path is absolute
    const absPath = toAbsolutePath(libraryPath)
    const packageJsonPath = path.join(absPath, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      console.log(`No package.json found at ${packageJsonPath}`)
      return null
    }

    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')
    return JSON.parse(packageJsonContent)
  } catch (error) {
    console.error(`Error reading package.json at ${libraryPath}:`, error)
    return null
  }
}

/**
 * Creates a template package.json for a library
 * @param {string} libraryPath - Path to the library directory
 * @returns {Object} - A template package.json object
 */
export const createPackageJsonTemplate = (libraryPath) => {
  // Extract package name components from the path
  const pathParts = libraryPath.split(path.sep)
  const libraryTypeIndex = pathParts.findIndex((part) => part === 'frontend')

  if (libraryTypeIndex >= 0 && pathParts.length > libraryTypeIndex + 2) {
    // Format example: @codelab/frontend-application-builder or @codelab/frontend-domain-element
    const libraryType = pathParts[libraryTypeIndex + 1] // 'application' or 'domain'
    const libraryName = pathParts[libraryTypeIndex + 2] // e.g., 'builder', 'element', etc.
    const packageName = `@codelab/frontend-${libraryType}-${libraryName}`

    return {
      exports: {
        '.': {
          default: './src/index.ts',
          import: './src/index.ts',
          types: './src/index.ts',
        },
      },
      name: packageName,
      devDependencies: {},
    }
  }

  // Fallback for paths that don't match the expected pattern
  const libraryName = path.basename(libraryPath)
  return {
    exports: {
      '.': {
        default: './src/index.ts',
        import: './src/index.ts',
        types: './src/index.ts',
      },
    },
    name: `@codelab/${libraryName}`,
    devDependencies: {},
  }
}

/**
 * Writes a package.json file to the specified path
 * @param {string} libraryPath - Path to the library directory
 * @param {Object} packageJson - The package.json content to write
 * @returns {boolean} - True if successful, false otherwise
 */
export const writePackageJson = (libraryPath, packageJson) => {
  try {
    // Ensure path is absolute
    const absPath = toAbsolutePath(libraryPath)
    const packageJsonPath = path.join(absPath, 'package.json')

    // Ensure the packageJson is properly formatted with 2-space indentation
    const formattedContent = JSON.stringify(packageJson, null, 2)

    fs.writeFileSync(packageJsonPath, formattedContent)
    console.log(`Successfully wrote package.json to ${packageJsonPath}`)
    return true
  } catch (error) {
    console.error(`Error writing package.json to ${libraryPath}:`, error)
    return false
  }
}

/**
 * Determines if a package is internal (part of the workspace)
 * @param {string} packageName - Name of the package to check
 * @returns {boolean} - True if the package is internal, false otherwise
 */
export const isInternalPackage = (packageName) => {
  // Consider packages starting with @codelab/ as internal
  return packageName.startsWith('@codelab/')
}

/**
 * Get all internal package names from libraries.json
 * @returns {Set<string>} - Set of all internal package names
 */
export const getAllInternalPackages = () => {
  try {
    // Check if libraries.json exists
    if (!fs.existsSync(LIBRARIES_FILE)) {
      console.error(`Error: ${LIBRARIES_FILE} not found`)
      console.error('Please run analyze-project-structure.js first')
      return new Set()
    }

    // Read libraries from the JSON file
    const libraries = JSON.parse(fs.readFileSync(LIBRARIES_FILE, 'utf8'))
    const internalPackages = new Set()

    // Process application libraries
    for (const libraryPath of libraries.application) {
      const pathParts = libraryPath.split(path.sep)
      const libraryTypeIndex = pathParts.findIndex(
        (part) => part === 'frontend',
      )

      if (libraryTypeIndex >= 0 && pathParts.length > libraryTypeIndex + 2) {
        const libraryType = pathParts[libraryTypeIndex + 1] // 'application'
        const libraryName = pathParts[libraryTypeIndex + 2] // e.g., 'builder'
        const packageName = `@codelab/frontend-${libraryType}-${libraryName}`
        internalPackages.add(packageName)
      }
    }

    // Process domain libraries
    for (const libraryPath of libraries.domain) {
      const pathParts = libraryPath.split(path.sep)
      const libraryTypeIndex = pathParts.findIndex(
        (part) => part === 'frontend',
      )

      if (libraryTypeIndex >= 0 && pathParts.length > libraryTypeIndex + 2) {
        const libraryType = pathParts[libraryTypeIndex + 1] // 'domain'
        const libraryName = pathParts[libraryTypeIndex + 2] // e.g., 'element'
        const packageName = `@codelab/frontend-${libraryType}-${libraryName}`
        internalPackages.add(packageName)
      }
    }

    // Add any other known internal packages
    internalPackages.add('@codelab/shared-abstract-core')
    internalPackages.add('@codelab/shared-abstract-types')
    internalPackages.add('@codelab/shared-utils')
    internalPackages.add('@codelab/shared-domain-module-app')
    internalPackages.add('@codelab/shared-infra-fetch')
    internalPackages.add('@codelab/shared-infra-fetch-server')
    internalPackages.add('@codelab/shared-infra-gqlgen')
    internalPackages.add('@codelab/shared-infra-logging')
    internalPackages.add('@codelab/shared-infra-auth0')
    internalPackages.add('@codelab/shared-infra-sentry')
    internalPackages.add('@codelab/shared-infra-typebox')
    internalPackages.add('@codelab/shared-config-env')

    return internalPackages
  } catch (error) {
    console.error('Error getting internal packages:', error)
    return new Set()
  }
}

/**
 * Merges new dependencies with existing dependencies
 * @param {Object} existingDeps - Existing dependencies object
 * @param {string[]} newDeps - Array of new dependency package names
 * @param {Set<string>} internalPackages - Set of internal package names
 * @returns {Object} - Merged dependencies object
 */
export const mergeDependencies = (
  existingDeps = {},
  newDeps = [],
  internalPackages = new Set(),
) => {
  const result = { ...existingDeps }

  for (const dep of newDeps) {
    // Skip if it's already in the dependencies with a specific version
    if (result[dep] && result[dep] !== '*' && result[dep] !== 'workspace:*') {
      console.log(`Keeping existing version for ${dep}: ${result[dep]}`)
      continue
    }

    // Add dependency with appropriate version
    if (internalPackages.has(dep)) {
      // Internal dependencies use workspace:*
      result[dep] = 'workspace:*'
    } else if (!result[dep]) {
      // For external dependencies without a version, use placeholder
      result[dep] = '*'
    }
  }

  return result
}

/**
 * Updates or creates a package.json file with new dependencies
 * @param {string} libraryPath - Path to the library directory
 * @param {string[]} dependencies - Array of dependency package names to add
 * @returns {boolean} - True if successful, false otherwise
 */
export const updatePackageJson = (libraryPath, dependencies) => {
  try {
    // Read existing package.json or create a new one
    let packageJson = readPackageJson(libraryPath)

    if (!packageJson) {
      packageJson = createPackageJsonTemplate(libraryPath)
    }

    // Initialize devDependencies if it doesn't exist
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {}
    }

    // Get the set of internal packages
    const internalPackages = getAllInternalPackages()

    // Merge dependencies
    packageJson.devDependencies = mergeDependencies(
      packageJson.devDependencies,
      dependencies,
      internalPackages,
    )

    // Write the updated package.json back to disk
    return writePackageJson(libraryPath, packageJson)
  } catch (error) {
    console.error(`Error updating package.json at ${libraryPath}:`, error)
    return false
  }
}

/**
 * Creates or updates a package.json file for a library based on its dependencies
 * @param {string} libraryPath - Path to the library
 * @param {string[]} importedPackages - List of packages imported by the library
 * @returns {Object} - Summary of the update operation
 */
export const processLibrary = (libraryPath, importedPackages) => {
  try {
    console.log(`Processing library: ${libraryPath}`)
    console.log(`  Found ${importedPackages.length} imported packages`)

    // Filter out relative imports and normalize
    const dependencies = importedPackages.filter(
      (pkg) => !pkg.startsWith('.') && !pkg.startsWith('/'),
    )

    // Update or create the package.json
    const success = updatePackageJson(libraryPath, dependencies)

    return {
      libraryPath,
      dependenciesCount: dependencies.length,
      success,
    }
  } catch (error) {
    console.error(`Error processing library ${libraryPath}:`, error)
    return {
      libraryPath,
      dependenciesCount: 0,
      success: false,
      error: error.message,
    }
  }
}

// Simple test function
const testReader = () => {
  // Test reading an existing package.json
  const webPackage = readPackageJson(path.join(__dirname, '../apps/web'))
  console.log('Web package.json:', webPackage ? 'Found' : 'Not found')

  // Test creating a template package.json for an application library
  const appTemplate = createPackageJsonTemplate(
    path.join(__dirname, '../libs/frontend/application/builder'),
  )
  console.log('Application template package.json:', appTemplate)

  // Test creating a template package.json for a domain library
  const domainTemplate = createPackageJsonTemplate(
    path.join(__dirname, '../libs/frontend/domain/element'),
  )
  console.log('Domain template package.json:', domainTemplate)

  // Test getting internal packages
  const internalPackages = getAllInternalPackages()
  console.log('Internal packages count:', internalPackages.size)
  console.log(
    'Sample internal packages:',
    Array.from(internalPackages).slice(0, 5),
  )

  // Test checking if a package is internal
  console.log(
    'Is @codelab/frontend-application-builder internal?',
    isInternalPackage('@codelab/frontend-application-builder'),
  )
  console.log('Is react internal?', isInternalPackage('react'))

  // Test merging dependencies
  const existingDeps = {
    react: '^18.0.0',
    '@codelab/frontend-abstract-types': 'workspace:*',
    lodash: '4.17.21',
  }

  const newDeps = [
    'react',
    '@codelab/frontend-abstract-types',
    '@codelab/frontend-application-dnd/components',
    'lodash',
    'uuid',
  ]

  const mergedDeps = mergeDependencies(existingDeps, newDeps, internalPackages)
  console.log('Merged dependencies:', mergedDeps)
}

// If this file is run directly, run the test
if (import.meta.url === `file://${__filename}`) {
  testReader()
}
