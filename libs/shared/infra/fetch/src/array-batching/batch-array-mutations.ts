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
  operationName: string
}

// Default configuration
const DEFAULT_BATCH_SIZE = 10

/**
 * Extracts operation type and name from a GraphQL document
 */
export const extractOperationInfo = <TResult, TVariables>(
  document: DocumentTypeDecoration<TResult, TVariables>,
): { operationType?: string; operationName?: string } => {
  const queryString = document.toString()

  const operationMatch = queryString.match(
    /(query|mutation|subscription)\s+(\w+)/,
  )

  return {
    operationName: operationMatch ? operationMatch[2] : undefined,
    operationType: operationMatch ? operationMatch[1] : undefined,
  }
}

/**
 * Determines if a mutation needs array batching based on its input size
 * Works for any mutation with array inputs, not just create*
 * Note: This is specifically for mutations only, not queries
 */
export const needsMutationArrayBatching = <TVariables extends ObjectLike>(
  document: DocumentTypeDecoration<unknown, TVariables>,
  variables: TVariables,
  batchSize = DEFAULT_BATCH_SIZE,
): BatchConfig | null => {
  const { operationName, operationType } = extractOperationInfo(document)

  // Only batch mutations
  if (operationType !== 'mutation' || !operationName) {
    return null
  }

  // Check for array inputs in variables
  // Most mutations use 'input' as the field name
  for (const [fieldName, value] of Object.entries(variables)) {
    if (Array.isArray(value) && value.length > batchSize) {
      return {
        batchSize,
        fieldName,
        operationName,
      }
    }
  }

  return null
}

/**
 * Handles array batching for GraphQL mutations with large array inputs.
 *
 * This function addresses Neo4j/GraphQL limitations where large array inputs in mutations
 * can cause performance issues or failures. It works by:
 *
 * 1. Checking if the operation needs batching (mutations with large arrays)
 * 2. If not needed, executing the request normally (queries, small arrays, etc.)
 * 3. For large mutation arrays: splitting into smaller chunks
 * 4. Executing multiple mutation requests, one for each batch
 * 5. Merging the results back together to appear as a single operation
 *
 * Key features:
 * - Gracefully handles all GraphQL operations (queries pass through unchanged)
 * - Only batches mutations with array inputs larger than batchSize
 * - Preserves the original GraphQL response structure
 * - Merges arrays at depth 2 (typical for mutation responses like createFields.fields)
 * - Provides detailed logging for debugging batch operations
 *
 * Example use case:
 * When creating 100 fields, instead of one request with 100 items that might timeout,
 * this creates 10 requests with 10 items each, then combines the results.
 *
 * @param document - The GraphQL document to execute
 * @param variables - The variables for the GraphQL operation
 * @param executeRequest - Function to execute each individual request
 * @param next - Optional Next.js fetch options (for server-side usage)
 * @param batchSize - The maximum number of items per batch (default: 10)
 * @returns The result of the operation (batched and merged for large mutations, or unchanged for others)
 */
export const batchArrayMutations = async <
  TResult,
  TVariables extends ObjectLike,
>(
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  executeRequest: (
    doc: DocumentTypeDecoration<TResult, TVariables>,
    vars: TVariables,
    options?: NextFetchOptions,
  ) => Promise<TResult>,
  next?: NextFetchOptions,
  batchSize = DEFAULT_BATCH_SIZE,
): Promise<TResult> => {
  // Check if this mutation needs array batching
  const batchConfig = needsMutationArrayBatching(document, variables, batchSize)

  // If no batching needed, execute normally
  if (!batchConfig) {
    return executeRequest(document, variables, next)
  }

  const inputArray = variables[batchConfig.fieldName] as Array<unknown>
  // Split into batches using remeda chunk function
  // cspell:ignore remeda
  const batches = chunk(inputArray, batchConfig.batchSize)

  logger.info(
    `Splitting ${batchConfig.operationName} into ${batches.length} batches`,
    {
      batchSize: batchConfig.batchSize,
      context: 'batch-mutation-wrapper',
      totalItems: inputArray.length,
    },
  )

  // Execute batches in parallel using p-map for controlled concurrency
  const batchResults = await pMap(
    batches,
    async (batch, index) => {
      const batchVariables = {
        ...variables,
        [batchConfig.fieldName]: batch,
      }

      logger.debug(`Executing batch ${index + 1}/${batches.length}`, {
        batchIndex: index,
        batchSize: batch.length,
        context: 'batch-mutation-wrapper',
        operationName: batchConfig.operationName,
      })

      const result = await executeRequest(
        document,
        batchVariables as TVariables,
        next,
      )

      // Log the IDs returned in this batch result
      traverse(result as ObjectLike).forEach(function (
        this: traverse.TraverseContext,
        value: unknown,
      ) {
        if (this.level === 2 && Array.isArray(value)) {
          logger.debug(
            `Batch ${index + 1} returned ${value.length} items at depth ${
              this.level
            }`,
            {
              batchIndex: index,
              context: 'batch-mutation-wrapper',
              depth: this.level,
              operationName: batchConfig.operationName,
              path: this.path.join('.'),
              returnedItemCount: value.length,
            },
          )
        }
      })

      return result
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
      // Only merge arrays at depth 2 (for mutations like createApps.apps)
      if (this.level === 2 && Array.isArray(value)) {
        const path = this.path
        // Get the existing array from merged
        const mergedValue = traverse(merged).get(path)

        if (Array.isArray(mergedValue)) {
          logger.debug(`Merging array at depth ${this.level}`, {
            context: 'batch-mutation-wrapper',
            depth: this.level,
            existingItems: mergedValue.length,
            newItems: value.length,
            path: path.join('.'),
          })

          // Merge the arrays
          traverse(merged).set(path, [...mergedValue, ...value])
        }
      }
    })

    return merged
  }, firstResult)

  // Log the final merged result
  traverse(mergedResult as ObjectLike).forEach(function (
    this: traverse.TraverseContext,
    value: unknown,
  ) {
    if (this.level === 2 && Array.isArray(value)) {
      logger.info(
        `Final merged result for ${batchConfig.operationName} at depth ${this.level}`,
        {
          context: 'batch-mutation-wrapper',
          depth: this.level,
          operationName: batchConfig.operationName,
          path: this.path.join('.'),
          totalItemCount: value.length,
        },
      )
    }
  })

  logger.info(`Completed ${batchConfig.operationName} batch execution`, {
    batchCount: batches.length,
    context: 'batch-mutation-wrapper',
    operationName: batchConfig.operationName,
  })

  return mergedResult
}
