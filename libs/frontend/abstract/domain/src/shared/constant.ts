/**
 * <div data-component-id="0" />
 *
 * becomes
 *
 * node.dataset.componentId
 */

export const DATASET_COMPONENT_ID = 'componentId'

export const DATA_COMPONENT_ID = 'data-component-id'

export const DATASET_ELEMENT_ID = 'elementId'

export const DATA_ELEMENT_ID = 'data-element-id'

export const DATA_RUNTIME_ELEMENT_KEY = 'data-runtime-element-key'

export const BUILDER_CONTAINER_ID = 'Builder'

export const BUILDER_NONE_CLASS_NAME = 'Builder-none'

export const BINDING_WILDCARD = '*'

export const DATA_GRID = 'DATA-GRID'

export const ROOT_RENDER_CONTAINER_ID = 'render-root'

export const BLUEPRINT_ID_PREFIX = 'blueprint-'

export const LAST_WORD_AFTER_DOT_REGEX = /\.\w+$/

export const WORD_BEFORE_DOT_REGEX = /\w*(\.)?/

// export const DEFAULT_GET_SERVER_SIDE_PROPS = `async function (context) {
//     return {
//       props: {},
//       redirect: undefined,
//       notFound: false,
//     }
//   }`

export enum CACHE_TAGS {
  APP_LIST = 'APP_LIST_CACHE_TAG',
  ATOM_LIST = 'ATOM_LIST_CACHE_TAG',
  AUTH_GUARD_LIST = 'AUTH_GUARD_LIST_CACHE_TAG',
  COMPONENTS_LIST = 'COMPONENTS_LIST_CACHE_TAG',
  DOMAIN_LIST = 'DOMAIN_LIST_CACHE_TAG',
  ELEMENT_LIST = 'ELEMENT_LIST_CACHE_TAG',
  PAGE_LIST = 'PAGE_LIST_CACHE_TAG',
  PREFERENCE = 'PREFERENCE_CACHE_TAG',
  RESOURCE_LIST = 'RESOURCE_LIST_CACHE_TAG',
  STORE_LIST = 'STORE_LIST_CACHE_TAG',
}
