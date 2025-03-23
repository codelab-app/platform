import type { Option, Where } from './cache-options'

// Base cache tag constants
import { createCacheTag } from './utils'

const BASE_TAGS = {
  APP_LIST: 'APP_LIST_CACHE_TAG',
  ATOM_LIST: 'ATOM_LIST_CACHE_TAG',
  AUTH_GUARD_LIST: 'AUTH_GUARD_LIST_CACHE_TAG',
  COMPONENTS_LIST: 'COMPONENTS_LIST_CACHE_TAG',
  DOMAIN_LIST: 'DOMAIN_LIST_CACHE_TAG',
  ELEMENT_LIST: 'ELEMENT_LIST_CACHE_TAG',
  PAGE_LIST: 'PAGE_LIST_CACHE_TAG',
  PREFERENCE: 'PREFERENCE_CACHE_TAG',
  RESOURCE_LIST: 'RESOURCE_LIST_CACHE_TAG',
  STORE_LIST: 'STORE_LIST_CACHE_TAG',
}

// Cache tags as functions similar to PageType
export const CACHE_TAGS = {
  AppList: () => BASE_TAGS.APP_LIST,
  AtomList: ({ options, where }: { options?: Option; where?: Where } = {}) => {
    return createCacheTag(BASE_TAGS.ATOM_LIST, options, where)
  },
  AuthGuardList: () => BASE_TAGS.AUTH_GUARD_LIST,
  ComponentsList: () => BASE_TAGS.COMPONENTS_LIST,
  DomainList: () => BASE_TAGS.DOMAIN_LIST,
  ElementList: () => BASE_TAGS.ELEMENT_LIST,
  PageList: () => BASE_TAGS.PAGE_LIST,
  Preference: () => BASE_TAGS.PREFERENCE,
  ResourceList: () => BASE_TAGS.RESOURCE_LIST,
  StoreList: () => BASE_TAGS.STORE_LIST,
}
