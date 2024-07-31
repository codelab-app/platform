import type { Nullable } from '@codelab/shared/abstract/types'

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
  [key: string]: string | undefined
  primarySidebarKey?: string
}

export interface IRouterProps {
  params: Nullable<UrlParams>
  query: Nullable<UrlQuery>
}

export type IRouterService = IRouterProps &
  UrlParams &
  UrlQuery & {
    update(router: Partial<IRouterProps>): void
  }
