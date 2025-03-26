import { EntityType } from '@codelab/frontend/abstract/types'

import type { Option, Where } from './cache-options'

import {
  createDeterministicTagParams,
  createItemTag,
  createItemWithListTags,
  createListTag,
  invalidateItem as invalidateItemUtil,
  invalidateRelated as invalidateRelatedUtil,
} from './utils'

/**
 * Cache tag constants using a more structured approach:
 * - Consistent pattern across all tags
 * - Support for entity-specific invalidation
 * - Better TypeScript type safety
 * - Grouped by entity type
 */

// Define entity types for better type checking

export interface CacheTagOptions {
  id?: string
  options?: Option
  where?: Where
}

/**
 * These map more closely to the entity types, so we key by model. Whereas UiKey is aligned to both UI and model, so harder to have the same structure
 */
export const CACHE_TAGS = {
  Action: {
    item: (id: string) => createItemTag(EntityType.Action, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Action, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Action, options),
  },

  App: {
    item: (id: string) => createItemTag(EntityType.App, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.App, id),
    list: (options?: CacheTagOptions) => createListTag(EntityType.App, options),
  },

  Atom: {
    item: (id: string) => createItemTag(EntityType.Atom, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Atom, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Atom, options),
  },

  AuthGuard: {
    item: (id: string) => createItemTag(EntityType.AuthGuard, id),
    itemWithList: (id: string) =>
      createItemWithListTags(EntityType.AuthGuard, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.AuthGuard, options),
  },

  Component: {
    builder: () => 'COMPONENT_BUILDER',
    item: (id: string) => createItemTag(EntityType.Component, id),
    itemWithList: (id: string) =>
      createItemWithListTags(EntityType.Component, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Component, options),
  },

  Domain: {
    item: (id: string) => createItemTag(EntityType.Domain, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Domain, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Domain, options),
  },

  Element: {
    item: (id: string) => createItemTag(EntityType.Element, id),
    itemWithList: (id: string) =>
      createItemWithListTags(EntityType.Element, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Element, options),
  },

  Field: {
    item: (id: string) => createItemTag(EntityType.Field, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Field, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Field, options),
  },

  invalidateItem: (entity: EntityType, id: string) =>
    invalidateItemUtil(entity, id),

  invalidateRelated: (
    entity: EntityType,
    id: string,
    relatedEntities: Array<EntityType>,
  ) => invalidateRelatedUtil(entity, id, relatedEntities),

  Page: {
    builder: () => 'PAGE_BUILDER',
    item: (id: string) => createItemTag(EntityType.Page, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Page, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Page, options),
  },

  Preference: {
    all: () => 'PREFERENCE',
    user: (userId: string) => `PREFERENCE:USER:${userId}`,
  },

  Prop: {
    item: (id: string) => createItemTag(EntityType.Prop, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Prop, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Prop, options),
  },

  Redirect: {
    item: (id: string) => createItemTag(EntityType.Redirect, id),
    itemWithList: (id: string) =>
      createItemWithListTags(EntityType.Redirect, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Redirect, options),
  },

  Resource: {
    item: (id: string) => createItemTag(EntityType.Resource, id),
    itemWithList: (id: string) =>
      createItemWithListTags(EntityType.Resource, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Resource, options),
  },

  Store: {
    item: (id: string) => `STORE:${id}`,
    itemWithList: (id: string) => [`STORE:${id}`, 'STORE_LIST'],
    list: (options?: CacheTagOptions) =>
      options
        ? `STORE_LIST::${createDeterministicTagParams(
            options.options,
          )}::${createDeterministicTagParams(options.where)}`
        : 'STORE_LIST',
  },

  Tag: {
    item: (id: string) => createItemTag(EntityType.Tag, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Tag, id),
    list: (options?: CacheTagOptions) => createListTag(EntityType.Tag, options),
  },

  Type: {
    item: (id: string) => createItemTag(EntityType.Type, id),
    itemWithList: (id: string) => createItemWithListTags(EntityType.Type, id),
    list: (options?: CacheTagOptions) =>
      createListTag(EntityType.Type, options),
  },
}
