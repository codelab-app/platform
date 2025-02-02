/**
 * Params are not required until we are in a specific context
 *
 * These either come from page props or useSeachParams hook
 */
export interface UrlPathParamsProps {
  actionId?: string
  appId?: string
  authGuardId?: string
  componentId?: string
  interfaceId?: string
  pageId?: string
  resourceId?: string
}

/**
 * These are validated and lazy get
 */
export type UrlPathParams = Required<UrlPathParamsProps>
