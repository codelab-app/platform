#!/usr/bin/env node

import {
  isInternalPackage,
  formatPackageVersion,
  getAllInternalPackages,
  classifyDependency,
  classifyDependencies,
  mergeDependencies,
  getPackageDependencies,
} from './dependency-classifier.js'

console.log('Testing Dependency Classifier')
console.log('============================\n')

// Test internal package detection
console.log('--- Testing isInternalPackage ---')
const internalPackagesList = ['@codelab/ui', '@codelab/core', '@codelab/utils']
console.log(
  'Is @codelab/ui internal?',
  isInternalPackage('@codelab/ui', internalPackagesList),
)
console.log(
  'Is react internal?',
  isInternalPackage('react', internalPackagesList),
)
console.log(
  'Is @codelab/test internal? (using default check)',
  isInternalPackage('@codelab/test'),
)
console.log(
  'Is @some-other/pkg internal? (using default check)',
  isInternalPackage('@some-other/pkg'),
)

// Test package version formatting
console.log('\n--- Testing formatPackageVersion ---')
console.log(
  '@codelab/ui with version ^1.0.0:',
  formatPackageVersion('@codelab/ui', '^1.0.0', internalPackagesList),
)
console.log(
  'react with version ^18.2.0:',
  formatPackageVersion('react', '^18.2.0', internalPackagesList),
)

// Test dependency classification (single)
console.log('\n--- Testing classifyDependency ---')
console.log(
  'Classification of @codelab/ui:',
  classifyDependency('@codelab/ui', '^1.0.0', internalPackagesList),
)
console.log(
  'Classification of react:',
  classifyDependency('react', '^18.2.0', internalPackagesList),
)

// Test dependency classification (multiple)
console.log('\n--- Testing classifyDependencies ---')
const testDependencies = {
  '@codelab/ui': '^1.0.0',
  '@codelab/core': '^2.0.0',
  react: '^18.2.0',
  'react-dom': '^18.2.0',
}
console.log(
  'Classification of multiple dependencies:',
  JSON.stringify(
    classifyDependencies(testDependencies, internalPackagesList),
    null,
    2,
  ),
)

// Test merging dependencies
console.log('\n--- Testing mergeDependencies ---')
const classifiedDeps = classifyDependencies(
  testDependencies,
  internalPackagesList,
)
console.log(
  'Merged dependencies:',
  JSON.stringify(mergeDependencies(classifiedDeps), null, 2),
)

// Test extracting dependencies from imports
console.log('\n--- Testing getPackageDependencies ---')
const testImports = [
  'react',
  '@codelab/ui',
  './local-module',
  '../parent-module',
  '@codelab/core/Button',
  'lodash/get',
]
console.log(
  'Extracted package dependencies:',
  getPackageDependencies(testImports),
)

// Test with empty values
console.log('\n--- Testing with empty values ---')
console.log(
  'Empty dependencies classification:',
  JSON.stringify(classifyDependencies(null), null, 2),
)
console.log('Empty imports extraction:', getPackageDependencies(null))

// Test with actual internal packages from JSON
console.log('\n--- Testing with actual internal packages ---')
try {
  const actualInternalPackages = getAllInternalPackages()
  console.log('Internal packages from libraries.json:', actualInternalPackages)

  // Test classification with actual internal packages
  if (actualInternalPackages.length > 0) {
    const sampleDeps = {
      [actualInternalPackages[0]]: '^1.0.0',
      react: '^18.2.0',
    }
    console.log(
      'Classification with actual internal packages:',
      JSON.stringify(
        classifyDependencies(sampleDeps, actualInternalPackages),
        null,
        2,
      ),
    )
  }
} catch (error) {
  console.error(
    'Error in testing with actual internal packages:',
    error.message,
  )
}

console.log('\nDependency Classifier Tests Completed')
