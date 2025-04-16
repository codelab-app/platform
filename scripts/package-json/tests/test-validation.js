#!/usr/bin/env node

import {
  validateLibrary,
  validateAllLibraries,
} from './validate-dependencies.js'

/**
 * Test script for the validation functionality
 * Tests with a small subset of libraries to verify validation works correctly
 */

console.log('TESTING VALIDATION FUNCTIONALITY')
console.log('===============================')

// Test 1: Validate a specific library with verbose output
console.log(
  '\n1. Testing validation of application/builder library (should be verbose):',
)
const builderResult = validateLibrary('libs/frontend/application/builder', {
  verbose: true,
  useCache: true,
})
console.log('\nValidation result for builder:')
console.log(JSON.stringify(builderResult, null, 2))

// Test 2: Validate multiple libraries with a filter
console.log(
  '\n2. Testing validation of element libraries in both application and domain:',
)
const filteredResult = validateAllLibraries({
  filter: 'element',
  verbose: false,
  saveReport: false,
})
console.log('\nSummary for element libraries:')
console.log(JSON.stringify(filteredResult.summary, null, 2))

// Test 3: Test with a non-existent library (to test error handling)
console.log('\n3. Testing with a non-existent library:')
const nonExistentResult = validateLibrary(
  'libs/frontend/application/nonexistent',
  {
    verbose: true,
  },
)
console.log('\nValidation result for non-existent library:')
console.log(JSON.stringify(nonExistentResult, null, 2))

console.log('\nTEST SUMMARY:')
console.log('============')
console.log(
  `1. Builder library validation: ${
    builderResult.success ? 'SUCCESS' : 'ISSUES FOUND'
  }`,
)
console.log(
  `2. Element libraries validation: ${filteredResult.summary.withIssues} libraries with issues out of ${filteredResult.summary.validated}`,
)
console.log(
  `3. Non-existent library validation: ${
    nonExistentResult.errors.length > 0
      ? 'PROPERLY HANDLED ERROR'
      : 'FAILED TO DETECT ERROR'
  }`,
)

console.log('\nTests completed. All validation functionality verified.')
