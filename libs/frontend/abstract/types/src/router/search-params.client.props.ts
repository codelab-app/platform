/* eslint-disable @typescript-eslint/ban-types */
import type { Identity } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'

/**
 * These come in as page props, the array query params could be string if there are only 1 key
 *
 * These are unlike `params`, and are not passed from server components. So it is rendered as undefined in the first pass
 */
export type SearchParamsClientProps = Assign<
  TreeViewClientProps,
  PaginationClientProps
>

export type SearchParamsProps<
  Key extends keyof SearchParamsClientProps = never,
> = [Key] extends [never]
  ? {
      searchParams?: undefined
    }
  : {
      searchParams: Promise<{ [K in Key]: SearchParamsClientProps[K] }>
    }

type _Some = SearchParamsProps<'page'>

// Test optionality
type _TestOptional = SearchParamsProps<'search'>

// Test multiple fields
type _TestMultiple = Identity<SearchParamsProps<'page' | 'search'>>

// Test required and optional fields
type _TestMixed = SearchParamsProps<'expandedKeys' | 'page'>

/**
 * Below are subset of search params
 */

/**
 * Not all tree view are paginated, such as builder
 */
export interface TreeViewClientProps {
  /**
   * For keeping track of directory tree expanded nodes when navigating
   */
  expandedKeys?: Array<string>
  search?: string

  /**
   * For the directory tree, useful when redirecting back
   */
  selectedKey?: string
}

/**
 * These are parsed from the client side and default values are added
 */
export interface PaginationClientProps {
  /**
   * @param filter - `?key=value` will become `string`, while `?key=value1&key=value2` will become `Array<string>`
   *
   * `key` is the field to target
   * `value` is the value to search
   */
  filter: string | Array<string>
  page: number
  pageSize: number
  /**
   * Make this search `name` only
   */
  search?: string
}
