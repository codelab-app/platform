import type { Option, Where } from './cache-options'

// Cache tag constants
import { createPaginatedCacheTag } from './utils'

// Cache tags as functions similar to PageType
export const CACHE_TAGS = {
  ActionList: () => 'ACTION_LIST_CACHE_TAG',
  AppList: () => 'APP_LIST_CACHE_TAG',
  AtomList: ({ options, where }: { options?: Option; where?: Where } = {}) => {
    return createPaginatedCacheTag('ATOM_LIST_CACHE_TAG', options, where)
  },
  AuthGuardList: () => 'AUTH_GUARD_LIST_CACHE_TAG',
  ComponentsList: () => 'COMPONENTS_LIST_CACHE_TAG',
  DomainList: () => 'DOMAIN_LIST_CACHE_TAG',
  ElementList: () => 'ELEMENT_LIST_CACHE_TAG',
  FieldList: () => 'FIELD_LIST_CACHE_TAG',
  PageBuilder: () => 'PAGE_BUILDER_CACHE_TAG',
  PageList: () => 'PAGE_LIST_CACHE_TAG',
  Preference: () => 'PREFERENCE_CACHE_TAG',
  PropList: () => 'PROP_LIST_CACHE_TAG',
  RedirectList: () => 'REDIRECT_LIST_CACHE_TAG',
  ResourceList: () => 'RESOURCE_LIST_CACHE_TAG',
  StoreList: () => 'STORE_LIST_CACHE_TAG',
  TagList: () => 'TAG_LIST_CACHE_TAG',
  TypeList: () => 'TYPE_LIST_CACHE_TAG',
}
