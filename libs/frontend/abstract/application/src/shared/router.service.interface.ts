/**
 * Url param like :details
 */
export interface UrlParams {
  appSlug?: string
  componentSlug?: string
  pageSlug?: string
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
