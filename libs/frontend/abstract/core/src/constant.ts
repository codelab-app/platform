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

export const BUILDER_CONTAINER_ID = 'Builder'
export const BUILDER_NONE_CLASS_NAME = 'Builder-none'

export const BINDING_WILDCARD = '*'
export const DATA_GRID = 'DATA-GRID'
export const ROOT_RENDER_CONTAINER_ID = 'render-root'
export const ROOT_ELEMENT_NAME = 'Body'

export const COMPONENT_TREE_CONTAINER = 'components'

export const ROOT_COMPONENT_ELEMENT_NAME = 'Component Root Element'
export const PROVIDER_ROOT_ELEMENT_NAME = 'Provider Root Element'
export const DETACHED_ROOT_ELEMENT_NAME = 'Detached Root Element'

export const PROVIDER_TREE_PAGE_NAME = 'Provider Tree'
export const STATE_PATH_TEMPLATE_START = '{{'
export const STATE_PATH_TEMPLATE_START_REGEX = /\{\{/g
// start bracket that is not closed with }}
export const STATE_PATH_TEMPLATE_START_OPEN_REGEX = /\{\{(?!(.+)?}})/g
export const STATE_PATH_TEMPLATE_END = '}}'
export const STATE_PATH_TEMPLATE_END_REGEX = /}}/g
export const STATE_PATH_TEMPLATE_REGEX = /\{\{[^}]+}}/g

export const LAST_WORD_AFTER_DOT_REGEX = /\.\w+$/
export const WORD_BEFORE_DOT_REGEX = /\w*(\.)?/
