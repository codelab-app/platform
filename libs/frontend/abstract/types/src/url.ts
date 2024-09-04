import type { Assign } from 'utility-types'

/**
 * Params are not required until we are in a specific context
 */
export interface UrlParams {
  appId?: string
  authGuardId?: string
  componentId?: string
  interfaceId?: string
  pageId?: string
  resourceId?: string
}

export interface PaginationSearchParams {
  page?: number
  pageSize?: number
}

export type PageContextParams = Pick<Required<UrlParams>, 'appId' | 'pageId'>

export type ComponentContextParams = Pick<Required<UrlParams>, 'componentId'>

/**
 * This is the actual string
 *
 * ?key=value
 */
export interface SearchParamsString {
  filter: Array<string>
  page: string | null
  pageSize: string | null
  primarySidebarKey: string | null
  search: string | null
}
/**
 * This is the application value with their types
 */
export type SearchParams = Assign<
  SearchParamsString,
  {
    page: number | null
    pageSize: number | null
  }
>
