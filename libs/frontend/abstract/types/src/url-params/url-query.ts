import type { Assign } from 'utility-types'

/**
 * This is used to type our pages with params
 */
export interface UrlQueryParamsString {
  filter?: Array<string>
  page?: string
  pageSize?: string
  primarySidebarKey?: string
  search?: string
}
/**
 * This is the application value with their types
 */
export type UrlQueryParams = Assign<
  UrlQueryParamsString,
  {
    page?: number
    pageSize?: number
  }
>
