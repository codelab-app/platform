import type { Assign, Required } from 'utility-types'
/**
 * These come in as page props, the array query params could be string if there are only 1 key
 *
 * @param {string} page - We pass default via middleware to the routes that require it
 * @param {string} pageSize We pass default via middleware to the routes that require it
 */
export interface URLSeachParamPageProps {
  /**
   * @param filter - `?key=value` will become `string`, while `?key=value1&key=value2` will become `Array<string>`
   */
  filter?: string | Array<string>
  /**
   * For the directory tree, useful when redirecting back
   */
  node?: string
  page?: string
  pageSize?: string
  primarySidebarKey?: string
  search?: string
}

/**
 * This is the application value with their types, at this point we have validated it yet. We will use a validated version for the hook with get accessor
 */
export type URLSearchParamsProps = Assign<
  URLSeachParamPageProps,
  {
    /**
     * @param filter = here we convert a maybe array type to string
     */
    filter?: Array<string>
    page?: number
    pageSize?: number
  }
>

/**
 * These types are the final types after validation, they represent the needed types in the calling context
 */
export type UrlQueryParams = Required<
  URLSearchParamsProps,
  'filter' | 'page' | 'pageSize'
>
