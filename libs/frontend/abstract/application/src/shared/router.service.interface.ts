import type { ParsedUrlQuery } from 'querystring'

export interface IRouterPath {
  appSlug?: string
  componentSlug?: string
  pageSlug?: string
  userSlug?: string
}

export interface IRouterQuery {
  primarySidebarKey?: string
}

export type IRouterService = Required<IRouterPath> &
  Required<IRouterQuery> & {
    path: IRouterPath
    query: IRouterQuery

    update(routerQuery: ParsedUrlQuery): void
  }
