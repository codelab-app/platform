import type { Assign } from 'utility-types'

/**
 * This is used to type our pages with params
 *
 * @param {string} page - We pass default via middleware to the routes that require it
 * @param {string} pageSize We pass default via middleware to the routes that require it
 */
export interface UrlQueryParamsString {
  filter: string
  page: string
  pageSize: string
  primarySidebarKey?: string
  search?: string
}
/**
 * This is the application value with their types
 */
export type UrlQueryParams = Assign<
  UrlQueryParamsString,
  {
    page: number
    pageSize: number
    filter: Array<string>
  }
>
