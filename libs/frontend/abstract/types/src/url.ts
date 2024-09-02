/**
 * Url param like :details
 */
export interface UrlParams {
  appId?: string
  authGuardId?: string
  componentId?: string
  interfaceId?: string
  libraryId?: string
  pageId?: string
  resourceId?: string
}

export interface PageContextParams {
  appId: string
  pageId: string
}

export interface ComponentContextParams {
  componentId: string
}

/**
 * ?key=value
 */
export interface UrlQuery {
  // [key: string]: string | undefined
  primarySidebarKey?: string
}
