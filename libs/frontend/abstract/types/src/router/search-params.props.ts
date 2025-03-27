/* eslint-disable @typescript-eslint/ban-types */
import type { Identity } from '@codelab/shared/abstract/types'
import type { Assign, Required } from 'utility-types'

/**
 * This is the server page props for app router
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/page#handling-filtering-with-searchparams
 *
 * But we don't need to use this, since our middleware already parses it
 */
// export interface SearchParamsServerProps {
//   [key: string]: string | Array<string> | undefined
// }

/**
 * These come in as page props, the array query params could be string if there are only 1 key
 *
 * These are unlike `params`, and are not passed from server components. So it is rendered as undefined in the first pass
 *
 * @param {string} page - We pass default via middleware to the routes that require it
 * @param {string} pageSize We pass default via middleware to the routes that require it
 */
export interface SearchParamsPageProps {
  /**
   * For keeping track of directory tree expanded nodes when navigating
   */
  expandedKeys?: Array<string>
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
  search?: string
  selectedKey?: string | undefined
}

/**
 * This is the application value with their types, at this point we have validated it yet. We will use a validated version for the hook with get accessor
 */
export type SearchParamsProps = Assign<
  SearchParamsPageProps,
  {
    /**
     * @param filter = here we convert a maybe array type to string
     */
    filter?: Array<string>
    page?: number
    pageSize?: number
  }
>
export type SearchParamProps<Key extends keyof SearchParamsPageProps = never> =
  [Key] extends [never]
    ? {
        searchParams?: undefined
      }
    : {
        searchParams: Promise<{
          /**
           * We filter out never values from the resulting type
           */
          [K in keyof Required<SearchParamsPageProps> as K extends Key
            ? K
            : never]: SearchParamsPageProps[K]
        }>
      }
export interface TreeViewSearchParams {
  /**
   * Require the key to make it easier to enforce. Easier to development when we change interface, the implementation will be forced to update
   */
  selectedKey: string | undefined
}

/**
 * These types are the final types after validation, they represent the needed types in the calling context
 *
 * The required have default values set
 */
export type SearchParamsContext = Required<
  SearchParamsProps,
  'filter' | 'page' | 'pageSize'
>
