#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Dependency Classifier
 *
 * Classifies dependencies as internal (workspace) or external
 * and formats them appropriately for package.json
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the libraries.json file (output from analyze-project-structure.js)
const LIBRARIES_FILE = path.join(__dirname, 'libraries.json')

/**
 * Normalizes a package name to only include the main package (before any slash)
 * @param {string} packageName - The package name to normalize
 * @returns {string} - The normalized package name
 */
export const normalizePackageName = (packageName) => {
  // For scoped packages like @codelab/something/nested
  if (packageName.startsWith('@')) {
    const scopedParts = packageName.split('/')
    if (scopedParts.length >= 2) {
      return `${scopedParts[0]}/${scopedParts[1]}`
    }
  }

  // For regular packages, just take everything before the first slash
  return packageName.split('/')[0]
}

/**
 * Get the libraries.json file content
 * @returns {Object} The content of libraries.json
 */
export const getLibrariesJson = () => {
  try {
    const librariesPath = path.join(process.cwd(), 'libraries.json')
    return JSON.parse(fs.readFileSync(librariesPath, 'utf8'))
  } catch (error) {
    console.error('Error reading libraries.json:', error.message)
    return { packages: [] }
  }
}

/**
 * Get all internal packages from libraries.json
 * @returns {string[]} Array of internal package names
 */
export const getAllInternalPackages = () => {
  const libraries = getLibrariesJson()
  return libraries.packages.map((pkg) => pkg.name)
}

/**
 * Check if a package is an internal package
 * @param {string} packageName - The name of the package to check
 * @param {string[]} [internalPackages] - Optional list of internal packages to check against
 * @returns {boolean} True if it's an internal package, false otherwise
 */
export const isInternalPackage = (packageName, internalPackages) => {
  // First check if the package name starts with @codelab - the simplest check
  if (packageName.startsWith('@codelab/')) {
    return true
  }

  // If we have a list of internal packages, also check against it (for backward compatibility)
  if (internalPackages && Array.isArray(internalPackages)) {
    return internalPackages.includes(packageName)
  }

  return false
}

/**
 * Format the package version based on whether it's internal or external
 * @param {string} packageName - The name of the package
 * @param {string} version - The version of the package
 * @param {string[]} [internalPackages] - Optional list of internal packages
 * @returns {string} The formatted version string
 */
export const formatPackageVersion = (
  packageName,
  version,
  internalPackages,
) => {
  if (isInternalPackage(packageName, internalPackages)) {
    return 'workspace:*'
  }
  return version
}

/**
 * Classify a single dependency
 * @param {string} packageName - The name of the package
 * @param {string} version - The version string
 * @param {string[]} [internalPackages] - Optional list of internal packages
 * @returns {Object} An object with package details and classification
 */
export const classifyDependency = (packageName, version, internalPackages) => {
  const isInternal = isInternalPackage(packageName, internalPackages)
  const formattedVersion = formatPackageVersion(
    packageName,
    version,
    internalPackages,
  )

  return {
    name: packageName,
    version: formattedVersion,
    isInternal,
  }
}

/**
 * Classify all dependencies as internal or external
 * @param {string[]|Object} dependencies - Array of dependencies or object with dependencies
 * @param {Object|string[]} existingVersions - Object with existing versions or array of internal packages
 * @returns {Object} Object with internal and external dependencies
 */
export const classifyDependencies = (dependencies, existingVersions = {}) => {
  // Handle different input types
  let depsToProcess = {}

  // If dependencies is an array of strings
  if (Array.isArray(dependencies)) {
    // Convert array to object with '*' as version
    dependencies.forEach((dep) => {
      depsToProcess[dep] = '*'
    })
  }
  // If dependencies is an object
  else if (dependencies && typeof dependencies === 'object') {
    depsToProcess = dependencies
  }
  // Return empty result if dependencies is invalid
  else {
    return {
      internal: {},
      external: {},
    }
  }

  const result = {
    internal: {},
    external: {},
  }

  // Get internal packages for checking
  const internalPackages = Array.isArray(existingVersions)
    ? existingVersions
    : null

  Object.entries(depsToProcess).forEach(([name, version]) => {
    const classification = classifyDependency(name, version, internalPackages)

    if (classification.isInternal) {
      result.internal[name] = classification.version
    } else {
      result.external[name] = classification.version
    }
  })

  return result
}

/**
 * Merge internal and external dependencies into a single object
 * @param {Object} classifiedDependencies - Object with internal and external dependencies
 * @returns {Object} Merged dependencies
 */
export const mergeDependencies = (classifiedDependencies) => {
  const { internal, external } = classifiedDependencies

  return {
    ...internal,
    ...external,
  }
}

/**
 * Extract package dependencies from an array of import paths
 * @param {string[]} importPaths - Array of import paths
 * @returns {string[]} Array of package names
 */
export const getPackageDependencies = (importPaths) => {
  if (!importPaths) return []

  return importPaths
    .filter((importPath) => {
      // Filter out relative imports and absolute paths
      return (
        !importPath.startsWith('./') &&
        !importPath.startsWith('../') &&
        !importPath.startsWith('/') &&
        !importPath.match(/^[a-zA-Z]:\\/)
      ) // Windows absolute path
    })
    .map((importPath) => {
      // Extract the package name (everything before the first slash or the entire string)
      const match = importPath.match(/^(@[^/]+\/[^/]+|[^/]+)/)
      return match ? match[0] : null
    })
    .filter(Boolean) // Remove null values
}

// Testing function
const testClassifier = () => {
  // Sample dependencies to test
  const dependencies = [
    '@codelab/frontend-application-builder',
    '@codelab/frontend-application-element/services',
    '@codelab/shared-abstract-core',
    'react',
    'react-dom',
    'lodash/get',
    '@ant-design/icons',
  ]

  // Sample existing versions
  const existingVersions = {
    react: '^18.0.0',
    lodash: '4.17.21',
  }

  // Classify the dependencies
  const classified = classifyDependencies(dependencies, existingVersions)
  console.log('Classified dependencies:')
  console.log(JSON.stringify(classified, null, 2))

  // Format for package.json
  const formatted = mergeDependencies(classified)
  console.log('\nFormatted for package.json:')
  console.log(JSON.stringify(formatted, null, 2))

  // Test individual classification
  const reactClassification = classifyDependency('react', existingVersions)
  console.log('\nReact classification:', reactClassification)

  const internalClassification = classifyDependency(
    '@codelab/frontend-application-builder',
    existingVersions,
    getAllInternalPackages(),
  )
  console.log('\nInternal package classification:', internalClassification)
}

// If this file is run directly, run the test
if (import.meta.url.endsWith('dependency-classifier.js')) {
  testClassifier()
}
