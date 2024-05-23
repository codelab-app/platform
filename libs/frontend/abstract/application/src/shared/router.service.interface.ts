import type { NextRouter } from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

interface Params {
  [key: string]: Array<string> | string
}

/**
 * Url param like :details
 */
export interface UrlParams extends Params {
  appSlug: string
  componentSlug: string
  pageSlug: string
  userSlug: string
}

/**
 * ?key=value
 */
export interface UrlQuery {
  primarySidebarKey?: string | null
}

export interface IRouterProps {
  param: Partial<UrlParams>
  query: UrlQuery
}

export type IRouterService = IRouterProps & {
  update(router: Partial<IRouterProps>): void
}
