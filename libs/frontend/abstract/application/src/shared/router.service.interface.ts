/**
 * Url param like :details
 */
export interface UrlParams {
  appSlug?: string
  authGuardId?: string
  componentSlug?: string
  interfaceId?: string
  pageSlug?: string
  resourceId?: string
  userSlug?: string
}

/**
 * ?key=value
 */
export interface UrlQuery {
  primarySidebarKey?: string
}

export interface IRouterProps {
  param: UrlParams
  query: UrlQuery
}

export type IRouterService = IRouterProps &
  UrlParams &
  UrlQuery & {
    update(router: Partial<IRouterProps>): void
  }
