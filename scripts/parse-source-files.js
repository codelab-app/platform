#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'

/**
 * Script to analyze source files and extract import statements
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the libraries.json file (output from analyze-project-structure.js)
const LIBRARIES_FILE = path.join(__dirname, 'libraries.json')
const OUTPUT_FILE = path.join(__dirname, 'imports.json')

// Regex patterns for import statements
const IMPORT_PATTERNS = [
  // ES6 imports: import X from 'package'
  /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g,
  // require imports: require('package')
  /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  // dynamic imports: import('package')
  /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
]

/**
 * Get all TypeScript/JavaScript files in a directory
 */
const getSourceFiles = (libraryPath) => {
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
 */
const extractImports = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const imports = new Set()

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
 * Normalize a package name to only include the main package (before any slash)
 */
const normalizePackageName = (packageName) => {
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
 * Analyze all source files in a library and extract unique imports
 */
const analyzeLibrary = (libraryPath) => {
  try {
    console.log(`Analyzing library: ${libraryPath}`)
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
  } catch (error) {
    console.error(`Error analyzing library ${libraryPath}:`, error)
    return []
  }
}

// Main execution
const main = async () => {
  try {
    // Check if libraries.json exists
    if (!fs.existsSync(LIBRARIES_FILE)) {
      console.error(`Error: ${LIBRARIES_FILE} not found`)
      console.error('Please run analyze-project-structure.js first')
      process.exit(1)
    }

    // Read libraries from the JSON file
    const libraries = JSON.parse(fs.readFileSync(LIBRARIES_FILE, 'utf8'))

    // Initialize results structure
    const result = {
      application: {},
      domain: {},
    }

    // Process application libraries
    console.log('Analyzing application libraries...')
    for (const libraryPath of libraries.application) {
      const libraryName = path.basename(libraryPath)
      result.application[libraryName] = analyzeLibrary(libraryPath)
    }

    // Process domain libraries
    console.log('Analyzing domain libraries...')
    for (const libraryPath of libraries.domain) {
      const libraryName = path.basename(libraryPath)
      result.domain[libraryName] = analyzeLibrary(libraryPath)
    }

    // Write results to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2))
    console.log(`Import analysis complete. Results written to ${OUTPUT_FILE}`)
  } catch (error) {
    console.error('Error parsing source files:', error)
    process.exit(1)
  }
}

// Run the script
main()
