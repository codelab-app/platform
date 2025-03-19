/**
 * Params are not required until we are in a specific context
 *
 * These either come from page props or useSearchParams hook
 */
export interface UrlParamsProps {
  actionId?: string
  appId?: string
  authGuardId?: string
  componentId?: string
  elementId?: string
  interfaceId?: string
  pageId?: string
  resourceId?: string
}

/**
 * These are validated and lazy get
 */
export type ValidatedUrlParamsProps = Required<UrlParamsProps>
