#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { globSync } from 'glob'
import {
  normalizePackageName,
  classifyDependencies,
} from './dependency-classifier.js'

/**
 * Module for analyzing a library and its dependencies
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the imports.json file (output from parse-source-files.js)
const IMPORTS_FILE = path.join(__dirname, 'imports.json')

/**
 * Get all TypeScript/JavaScript files in a library
 * @param {string} libraryPath - Path to the library
 * @returns {string[]} - Array of file paths
 */
export const getSourceFiles = (libraryPath) => {
  try {
    const srcPath = path.join(libraryPath, 'src')

    // If src path doesn't exist, return empty array
    if (!fs.existsSync(srcPath)) {
      return []
    }

    // Use glob to find all TypeScript/JavaScript files
    const sourceFiles = globSync('**/*.{ts,tsx,js,jsx}', {
      cwd: srcPath,
      absolute: true,
    })

    return sourceFiles
  } catch (error) {
    console.error(`Error finding source files in ${libraryPath}:`, error)
    return []
  }
}

/**
 * Extract all import statements from a source file
 * @param {string} filePath - Path to the source file
 * @returns {string[]} - Array of import statements
 */
export const extractImports = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const imports = new Set()

    // Regex patterns for import statements
    const IMPORT_PATTERNS = [
      // ES6 imports: import X from 'package'
      /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g,
      // require imports: require('package')
      /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      // dynamic imports: import('package')
      /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    ]

    // Apply all regex patterns to find imports
    for (const pattern of IMPORT_PATTERNS) {
      let match
      // Reset the regex lastIndex
      pattern.lastIndex = 0

      // Use exec to find all matches in the content
      while ((match = pattern.exec(content)) !== null) {
        const importPath = match[1]
        // Only keep package imports (ignore relative imports)
        if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
          imports.add(importPath)
        }
      }
    }

    return Array.from(imports)
  } catch (error) {
    console.error(`Error extracting imports from ${filePath}:`, error)
    return []
  }
}

/**
 * Get imports for a library from the imports.json file
 * @param {string} libraryPath - Path to the library
 * @returns {string[]|null} - Array of imported packages or null if not found
 */
export const getImportsFromJson = (libraryPath) => {
  try {
    // Check if imports.json exists
    if (!fs.existsSync(IMPORTS_FILE)) {
      console.error(`Error: ${IMPORTS_FILE} not found`)
      console.error('Please run parse-source-files.js first')
      return null
    }

    // Read imports from the JSON file
    const imports = JSON.parse(fs.readFileSync(IMPORTS_FILE, 'utf8'))

    // Get the library name from the path
    const libraryName = path.basename(libraryPath)

    // Log the library path for debugging
    console.log(
      `Looking for imports for library: ${libraryName} (${libraryPath})`,
    )

    // Try to determine the library type by searching for 'application' or 'domain' in the path
    const pathParts = libraryPath.split(path.sep)
    const frontendIndex = pathParts.findIndex((part) => part === 'frontend')
    const applicationIndex = pathParts.findIndex(
      (part) => part === 'application',
    )
    const domainIndex = pathParts.findIndex((part) => part === 'domain')

    // Try to find imports based on library type and name
    if (frontendIndex >= 0 && pathParts.length > frontendIndex + 2) {
      const libraryType = pathParts[frontendIndex + 1] // 'application' or 'domain'
      const libraryName = pathParts[frontendIndex + 2] // e.g., 'builder'

      console.log(
        `Determined library type: ${libraryType}, name: ${libraryName}`,
      )

      // Check if this library exists in the imports.json
      if (imports[libraryType] && imports[libraryType][libraryName]) {
        return imports[libraryType][libraryName]
      }
    }
    // If we can't determine by frontend/type/name pattern, try directly by name
    else if (imports.application && imports.application[libraryName]) {
      console.log(`Found library by name in application type`)
      return imports.application[libraryName]
    } else if (imports.domain && imports.domain[libraryName]) {
      console.log(`Found library by name in domain type`)
      return imports.domain[libraryName]
    }

    console.log(`Library not found in imports.json by path or name matching`)
    return null
  } catch (error) {
    console.error(`Error getting imports from JSON for ${libraryPath}:`, error)
    return null
  }
}

/**
 * Analyze a library to determine its dependencies
 * @param {string} libraryPath - Path to the library
 * @param {Object} options - Options for analysis
 * @param {boolean} options.useCache - Whether to use the cached imports.json
 * @param {boolean} options.detailedOutput - Whether to include detailed output
 * @returns {Object} - Analysis results
 */
export const analyzeLibrary = (libraryPath, options = {}) => {
  const { useCache = true, detailedOutput = false } = options

  try {
    console.log(`Analyzing library: ${libraryPath}`)

    // Get the name of the library
    const libraryName = path.basename(libraryPath)

    // Get the imports - either from cache or by analyzing source files
    let allImports = []

    if (useCache) {
      // Try to get imports from the JSON file
      allImports = getImportsFromJson(libraryPath)

      // If not found in cache, fall back to analyzing source files
      if (!allImports) {
        console.log(
          `  Library not found in imports.json, analyzing source files directly`,
        )
        allImports = analyzeSourceFiles(libraryPath)
      } else {
        console.log(`  Found ${allImports.length} imports in imports.json`)
      }
    } else {
      // Analyze source files directly
      allImports = analyzeSourceFiles(libraryPath)
    }

    // Read existing package.json if available
    let existingDeps = {}
    const packageJsonPath = path.join(libraryPath, 'package.json')

    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
        existingDeps = packageJson.devDependencies || {}
      } catch (error) {
        console.error(`  Error reading existing package.json: ${error.message}`)
      }
    }

    // Classify dependencies
    const classifiedDeps = classifyDependencies(allImports, existingDeps)

    // Build the result object
    const result = {
      libraryPath,
      libraryName,
      dependencies: {
        internal: Object.keys(classifiedDeps.internal).length,
        external: Object.keys(classifiedDeps.external).length,
        total:
          Object.keys(classifiedDeps.internal).length +
          Object.keys(classifiedDeps.external).length,
      },
      classifiedDependencies: classifiedDeps,
    }

    // Add source files info if detailed output requested
    if (detailedOutput) {
      const sourceFiles = getSourceFiles(libraryPath)
      result.sourceFiles = {
        count: sourceFiles.length,
        paths: sourceFiles,
      }
      result.analyzedImports = allImports
    }

    return result
  } catch (error) {
    console.error(`Error analyzing library ${libraryPath}:`, error)
    return {
      libraryPath,
      libraryName: path.basename(libraryPath),
      error: error.message,
      dependencies: {
        internal: 0,
        external: 0,
        total: 0,
      },
      classifiedDependencies: {
        internal: {},
        external: {},
      },
    }
  }
}

/**
 * Analyze source files directly to find imports
 * @param {string} libraryPath - Path to the library
 * @returns {string[]} - Array of imported packages
 */
export const analyzeSourceFiles = (libraryPath) => {
  const sourceFiles = getSourceFiles(libraryPath)
  console.log(`  Found ${sourceFiles.length} source files`)

  const allImports = new Set()

  // Process each source file
  for (const file of sourceFiles) {
    const fileImports = extractImports(file)

    // Normalize and add each import
    for (const importPath of fileImports) {
      const normalized = normalizePackageName(importPath)
      allImports.add(normalized)
    }
  }

  return Array.from(allImports).sort()
}

/**
 * Analyze multiple libraries in a project
 * @param {Object} options - Options for analysis
 * @param {string} options.rootDir - Root directory of the project
 * @param {boolean} options.verbose - Whether to include detailed logs
 * @returns {Object} - Analysis results
 */
export const analyzeLibraries = async (options = {}) => {
  const { rootDir = '.', verbose = false } = options

  try {
    console.log(`Analyzing libraries in ${rootDir}...`)

    // Find potential library directories
    const appDir = path.join(rootDir, 'apps')
    const libsDir = path.join(rootDir, 'libs')
    const results = { libraries: [], totalDependencies: 0 }

    // Check if directories exist
    const appDirExists = fs.existsSync(appDir)
    const libsDirExists = fs.existsSync(libsDir)

    if (!appDirExists && !libsDirExists) {
      console.error(`Could not find apps or libs directories in ${rootDir}`)
      return { error: 'Invalid project structure', libraries: [] }
    }

    // Find and analyze libraries in apps directory
    if (appDirExists) {
      const appEntries = fs.readdirSync(appDir, { withFileTypes: true })
      for (const entry of appEntries) {
        if (entry.isDirectory()) {
          const libraryPath = path.join(appDir, entry.name)
          if (fs.existsSync(path.join(libraryPath, 'package.json'))) {
            const analysis = analyzeLibrary(libraryPath, {
              detailedOutput: verbose,
            })
            results.libraries.push(analysis)
            results.totalDependencies += analysis.dependencies.total
            if (verbose) {
              console.log(
                `Analyzed app: ${entry.name} - Found ${analysis.dependencies.total} dependencies`,
              )
            }
          }
        }
      }
    }

    // Find and analyze libraries in libs directory
    if (libsDirExists) {
      const libsEntries = fs.readdirSync(libsDir, { withFileTypes: true })
      for (const entry of libsEntries) {
        if (entry.isDirectory()) {
          const categoryPath = path.join(libsDir, entry.name)
          const categoryEntries = fs.readdirSync(categoryPath, {
            withFileTypes: true,
          })

          for (const subEntry of categoryEntries) {
            if (subEntry.isDirectory()) {
              const subCategoryPath = path.join(categoryPath, subEntry.name)
              const subCategoryEntries = fs.readdirSync(subCategoryPath, {
                withFileTypes: true,
              })

              for (const libEntry of subCategoryEntries) {
                if (libEntry.isDirectory()) {
                  const libraryPath = path.join(subCategoryPath, libEntry.name)
                  if (fs.existsSync(path.join(libraryPath, 'package.json'))) {
                    const analysis = analyzeLibrary(libraryPath, {
                      detailedOutput: verbose,
                    })
                    results.libraries.push(analysis)
                    results.totalDependencies += analysis.dependencies.total
                    if (verbose) {
                      console.log(
                        `Analyzed lib: ${entry.name}/${subEntry.name}/${libEntry.name} - Found ${analysis.dependencies.total} dependencies`,
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(
      `Analysis complete. Found ${results.libraries.length} libraries with ${results.totalDependencies} total dependencies.`,
    )
    return results
  } catch (error) {
    console.error('Error analyzing libraries:', error)
    return { error: error.message, libraries: [] }
  }
}

// If this file is run directly, test with a sample library
if (import.meta.url.endsWith('library-analyzer.js')) {
  const testLibraryPath = path.join(
    __dirname,
    '..',
    'libs',
    'frontend',
    'application',
    'builder',
  )

  console.log('Testing library analyzer with cache:')
  const resultWithCache = analyzeLibrary(testLibraryPath, {
    detailedOutput: true,
  })
  console.log('Analysis result:')
  console.log(JSON.stringify(resultWithCache, null, 2))

  console.log('\nTesting library analyzer without cache:')
  const resultWithoutCache = analyzeLibrary(testLibraryPath, {
    useCache: false,
  })
  console.log('Analysis result:')
  console.log(JSON.stringify(resultWithoutCache, null, 2))
}
