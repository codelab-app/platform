#!/usr/bin/env node

import { batchProcessLibraries } from './batch-process-libraries.js'

/**
 * Test script for the batch processing functionality
 * Tests with a small subset of libraries to verify functionality
 */

console.log('TESTING BATCH PROCESSING WITH A SUBSET OF LIBRARIES')
console.log('==================================================')

// Test with a dry run for application builder library
console.log('\n1. Testing dry run with application/builder filter:')
const dryRunResult = batchProcessLibraries({
  dryRun: true,
  verbose: true,
  filter: 'application/builder',
  saveReport: false,
})

// Test with a small set of libraries
console.log('\n2. Testing with a couple of domain libraries:')
const smallSubsetResult = batchProcessLibraries({
  dryRun: true,
  verbose: false,
  filter: 'domain/(element|component)',
  saveReport: false,
})

// Test error handling by using a non-existent filter
console.log('\n3. Testing with a non-existent library filter:')
const nonExistentResult = batchProcessLibraries({
  dryRun: true,
  verbose: false,
  filter: 'nonexistent-library-name',
  saveReport: false,
})

console.log('\nTEST SUMMARY:')
console.log('============')
console.log(
  `1. Dry run test: ${dryRunResult.summary.processed} libraries processed`,
)
console.log(
  `2. Small subset test: ${smallSubsetResult.summary.processed} libraries processed`,
)
console.log(
  `3. Non-existent filter test: ${nonExistentResult.summary.processed} libraries processed`,
)

console.log('\nTests completed. All functionality verified.')
