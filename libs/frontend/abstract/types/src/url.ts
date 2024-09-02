/**
 * Url param like :details
 */
export interface UrlParams {
  appId: string
  authGuardId: string
  componentId: string
  interfaceId: string
  // libraryId: string
  pageId: string
  resourceId: string
}

export type PageContextParams = Pick<UrlParams, 'appId' | 'pageId'>

export type ComponentContextParams = Pick<UrlParams, 'componentId'>

/**
 * ?key=value
 */
export interface UrlQuery {
  // [key: string]: string | undefined
  primarySidebarKey?: string
}
