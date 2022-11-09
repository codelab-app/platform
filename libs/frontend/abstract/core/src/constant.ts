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

export const STATE_PATH_TEMPLATE_START = '{{'
export const STATE_PATH_TEMPLATE_START_REGEX = /\{\{/g
// start bracket that is not closed with }}
export const STATE_PATH_TEMPLATE_START_OPEN_REGEX = /\{\{(?!(.+)?}})/g
export const STATE_PATH_TEMPLATE_END = '}}'
export const STATE_PATH_TEMPLATE_END_REGEX = /}}/g
export const STATE_PATH_TEMPLATE_REGEX = /\{\{[^}]+}}/g

export const LAST_WORD_AFTER_DOT_REGEX = /\.\w+$/
export const WORD_BEFORE_DOT_REGEX = /\w*(\.)?/

export const CUSTOM_TEXT_PROP_KEY = 'customText'

export const APP_PAGE_NAME = '_app'
export const APP_PAGE_SLUG = '_app'
export const DEFAULT_GET_SERVER_SIDE_PROPS = `async function (context) {
  return {
    props: {},
    redirect: undefined,
    notFound: false,
  }
}`
