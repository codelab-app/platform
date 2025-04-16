#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { analyzeLibrary } from './library-analyzer.js'

/**
 * Test script for the library analyzer
 */

// Get the current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Libraries to test
const TEST_LIBRARIES = [
  {
    name: 'builder',
    type: 'application',
    description: 'Frontend application builder library',
  },
  {
    name: 'element',
    type: 'application',
    description: 'Frontend application element library',
  },
  {
    name: 'element',
    type: 'domain',
    description: 'Frontend domain element library',
  },
]

// Run tests with different options
const runTests = async () => {
  console.log('=== Library Analyzer Tests ===\n')

  // Test options
  const options = [
    {
      name: 'Default (with cache)',
      opts: {},
    },
    {
      name: 'Without cache',
      opts: { useCache: false },
    },
    {
      name: 'With detailed output',
      opts: { detailedOutput: true },
      libraries: [TEST_LIBRARIES[0]], // Only test the first library with detailed output to avoid too much output
    },
  ]

  // Run each test option
  for (const { name, opts, libraries = TEST_LIBRARIES } of options) {
    console.log(`\n== Testing with options: ${name} ==`)

    // Run for each library
    for (const { name: libName, type, description } of libraries) {
      const libraryPath = path.join(
        __dirname,
        '..',
        'libs',
        'frontend',
        type,
        libName,
      )

      console.log(`\n> Testing ${description} (${type}/${libName})`)

      // Check if library exists
      if (!fs.existsSync(libraryPath)) {
        console.log(`  Library not found at ${libraryPath}`)
        continue
      }

      // Analyze library
      const result = analyzeLibrary(libraryPath, opts)

      // Print summary
      console.log(`  Analysis summary:`)
      console.log(`  - Total dependencies: ${result.dependencies.total}`)
      console.log(`  - Internal dependencies: ${result.dependencies.internal}`)
      console.log(`  - External dependencies: ${result.dependencies.external}`)

      // Print internal dependencies
      console.log(`\n  Internal dependencies:`)
      Object.entries(result.classifiedDependencies.internal)
        .slice(0, 5) // Only show first 5
        .forEach(([dep, version]) => {
          console.log(`    ${dep}: ${version}`)
        })

      if (Object.keys(result.classifiedDependencies.internal).length > 5) {
        console.log(
          `    ... and ${
            Object.keys(result.classifiedDependencies.internal).length - 5
          } more`,
        )
      }

      // Print external dependencies
      console.log(`\n  External dependencies:`)
      Object.entries(result.classifiedDependencies.external)
        .slice(0, 5) // Only show first 5
        .forEach(([dep, version]) => {
          console.log(`    ${dep}: ${version}`)
        })

      if (Object.keys(result.classifiedDependencies.external).length > 5) {
        console.log(
          `    ... and ${
            Object.keys(result.classifiedDependencies.external).length - 5
          } more`,
        )
      }

      // If detailed output, print additional information
      if (opts.detailedOutput) {
        console.log(`\n  Source files: ${result.sourceFiles.count}`)
        console.log(`\n  All dependencies:`)
        console.log(result.analyzedImports.slice(0, 10).join('\n  '))
        if (result.analyzedImports.length > 10) {
          console.log(`  ... and ${result.analyzedImports.length - 10} more`)
        }
      }
    }
  }

  console.log('\n=== Testing special cases ===')

  // Test a non-existent library
  console.log('\n> Testing non-existent library')
  const nonExistentPath = path.join(
    __dirname,
    '..',
    'libs',
    'frontend',
    'application',
    'non-existent',
  )
  const nonExistentResult = analyzeLibrary(nonExistentPath)
  console.log(
    `  Analysis result: ${
      nonExistentResult.error ? 'Error handled properly' : 'No error reported'
    }`,
  )

  // Test a library with no source files
  console.log('\n> Testing directory with no source files')
  const noSourcePath = path.join(__dirname, '..', 'scripts') // scripts directory has no src folder
  const noSourceResult = analyzeLibrary(noSourcePath)
  console.log(
    `  Analysis result: ${
      noSourceResult.dependencies.total === 0
        ? 'Handled properly (0 dependencies)'
        : 'Unexpected result'
    }`,
  )
}

// Run the tests
runTests().catch((error) => {
  console.error('Error running tests:', error)
  process.exit(1)
})
