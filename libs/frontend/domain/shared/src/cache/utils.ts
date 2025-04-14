/**
 * Creates a deterministic string representation of query parameters
 * by sorting object keys before stringifying
 */

import type { EntityType } from '@codelab/frontend/abstract/types'

import type { Option, Where } from './cache-options'

// Define a more specific type for parameters
type TagParam = Option | Where | null | undefined

/**
 * Creates a deterministic string representation of query parameters
 * by sorting object keys before stringifying
 */
export const createDeterministicTagParams = (obj?: TagParam): string => {
  // Handle null or undefined
  if (obj === null) {
    return 'null'
  }

  if (obj === undefined) {
    return '{}'
  }

  // Process values while creating entries
  const entries = Object.entries(obj).map(([key, value]) => {
    let processedValue: string

    if (value === null) {
      processedValue = 'null'
    } else if (value === undefined) {
      processedValue = '{}'
    } else if (typeof value === 'object') {
      processedValue = JSON.stringify(value)
    } else {
      processedValue = String(value)
    }

    return [key, processedValue]
  })

  // Create a new object with sorted keys
  const sortedObject = Object.fromEntries(entries.sort())

  return JSON.stringify(sortedObject)
}

/**
 * Creates a unique cache tag from query parameters
 */
export const createPaginatedCacheTag = (
  baseTag: string,
  options?: Option,
  where?: Where,
): string => {
  if (!options && !where) {
    return baseTag
  }

  const uniqueTag = `${baseTag}::${createDeterministicTagParams(
    options,
  )}::${createDeterministicTagParams(where)}`

  return uniqueTag
}

// Base tag creation functions
export const createListTag = (
  entity: EntityType,
  options?: {
    options?: Option
    where?: Where
  },
) => {
  if (!options) {
    return `${entity}_LIST`
  }

  if (options.options || options.where) {
    return createPaginatedCacheTag(
      `${entity}_LIST`,
      options.options,
      options.where,
    )
  }

  return `${entity}_LIST`
}

export const createItemTag = (entity: EntityType, id: string) => {
  return `${entity}:${id}`
}

export const invalidateItem = (entity: EntityType, id: string) => {
  return [createItemTag(entity, id), createListTag(entity)]
}

export const invalidateRelated = (
  entity: EntityType,
  id: string,
  relatedEntities: Array<EntityType>,
) => {
  return [
    createItemTag(entity, id),
    createListTag(entity),
    ...relatedEntities.map((re) => createListTag(re)),
  ]
}

// Create a combined tag set for item and its containing list
export const createItemWithListTags = (entity: EntityType, id: string) => {
  return [createItemTag(entity, id), createListTag(entity)]
}
