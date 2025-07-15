import type {
  NextFetchOptions,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

import { logger } from '@codelab/shared-infra-logging'
import pMap from 'p-map'
import { chunk, clone } from 'remeda'
import traverse from 'traverse'

interface BatchConfig {
  batchSize: number
  fieldName: string
}

// Default configuration
const DEFAULT_BATCH_SIZE = 10

/**
 * Determines if a mutation needs array batching based on its input size
 * Works for any mutation with array inputs, not just create*
 */
export const needsArrayBatching = (
  operationName: string | undefined,
  variables: ObjectLike,
  batchSize = DEFAULT_BATCH_SIZE,
): BatchConfig | null => {
  if (!operationName) {
    return null
  }

  // Check for array inputs in variables
  // Most mutations use 'input' as the field name
  for (const [fieldName, value] of Object.entries(variables)) {
    if (Array.isArray(value) && value.length > batchSize) {
      return {
        batchSize,
        fieldName,
      }
    }
  }

  return null
}

/**
 * Splits large array inputs into batches and executes multiple requests
 */
export const executeWithArrayBatching = async <
  TResult,
  TVariables extends ObjectLike,
>(
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  operationName: string,
  config: BatchConfig,
  executeRequest: (
    doc: DocumentTypeDecoration<TResult, TVariables>,
    vars: TVariables,
    options?: NextFetchOptions,
  ) => Promise<TResult>,
  next?: NextFetchOptions,
): Promise<TResult> => {
  const inputArray = variables[config.fieldName] as Array<unknown>
  // Split into batches using remeda chunk function
  // cspell:ignore remeda
  const batches = chunk(inputArray, config.batchSize)

  logger.info(`Splitting ${operationName} into ${batches.length} batches`, {
    batchSize: config.batchSize,
    context: 'batch-mutation-wrapper',
    totalItems: inputArray.length,
  })

  // Execute batches in parallel using p-map for controlled concurrency
  const batchResults = await pMap(
    batches,
    async (batch, index) => {
      const batchVariables = {
        ...variables,
        [config.fieldName]: batch,
      }

      logger.debug(`Executing batch ${index + 1}/${batches.length}`, {
        batchIndex: index,
        batchSize: batch.length,
        context: 'batch-mutation-wrapper',
        operationName,
      })

      return executeRequest(document, batchVariables as TVariables, next)
    },
    // Limit concurrent requests to prevent overwhelming the server
    { concurrency: 5 },
  )

  // Merge arrays at the standard GraphQL mutation response depth
  // e.g., { createApps: { apps: [...] } } - merge the 'apps' array at depth 2

  // If only one batch, return it directly
  if (batchResults.length === 1) {
    const singleResult = batchResults[0]

    if (!singleResult) {
      throw new Error('Batch result is undefined')
    }

    return singleResult
  }

  // Start with the first result as base (deep cloned)
  const firstResult = clone(batchResults[0]) as TResult

  // Merge remaining results into the first one
  const mergedResult = batchResults.slice(1).reduce((merged, result) => {
    // Use traverse to find and merge arrays at depth 2
    traverse(result as ObjectLike).forEach(function (
      this: traverse.TraverseContext,
      value: unknown,
    ) {
      // Only process arrays at depth 2
      if (this.level === 2 && Array.isArray(value)) {
        const path = this.path
        const [mutationKey, property] = path as [string, string]
        // Get the existing array from merged
        const mergedValue = traverse(merged).get(path)

        if (Array.isArray(mergedValue)) {
          logger.debug('Merging array at depth 2', {
            context: 'batch-mutation-wrapper',
            existingItems: mergedValue.length,
            mutationKey,
            newItems: value.length,
            property,
          })

          // Merge the arrays
          traverse(merged).set(path, [...mergedValue, ...value])
        }
      }
    })

    return merged
  }, firstResult)

  logger.info(`Completed ${operationName} batch execution`, {
    batchCount: batches.length,
    context: 'batch-mutation-wrapper',
    operationName,
  })

  return mergedResult
}