import { createContext } from 'mobx-keystone'
import type { NextRouter } from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

/**
 * Url param like :details
 */
export interface IRouterParam {
  appSlug?: string
  componentSlug?: string
  pageSlug?: string
  userSlug?: string
}

/**
 * Query string
 */
export interface IRouterQuery {
  primarySidebarKey?: string
}

export interface IRouterProps {
  path: NextRouter['asPath']
  pathname: NextRouter['pathname']
  query: NextRouter['query']
}

export type IRouterService = IRouterParam &
  Required<IRouterQuery> & {
    param: IRouterParam
    queryString: IRouterQuery
    query: ParsedUrlQuery

    update(router: Partial<IRouterProps>): void
  }
