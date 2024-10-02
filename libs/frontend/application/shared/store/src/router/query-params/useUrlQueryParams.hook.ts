'use client'

import type { UrlQueryParamsProps } from '@codelab/frontend/abstract/types'
import type { Required } from 'utility-types'

import { Validator } from '@codelab/shared/infra/schema'
import { useSearchParams } from 'next/navigation'

import { parseQueryParams } from './query-params'

/**
 * When the properties are accessed, they are validated to be defined. The lazy loading allows for unaccessed optional properties.
 */
export const useUrlQueryParams = (): Required<
  UrlQueryParamsProps,
  'page' | 'pageSize'
> => {
  const searchParams = useSearchParams()

  const { filter, page, pageSize, primarySidebarKey, search } =
    parseQueryParams(searchParams)

  return {
    get filter() {
      return filter ? (Array.isArray(filter) ? filter : [filter]) : undefined
    },
    /**
     * @throws {Error} If 'page' parameter is not a valid number
     */
    get page() {
      Validator.assertsDefined(page)

      return parseInt(page, 10)
    },
    /**
     * @throws {Error} If 'pageSize' parameter is not a valid number
     */
    get pageSize() {
      Validator.assertsDefined(pageSize)

      return parseInt(pageSize, 10)
    },
    get primarySidebarKey() {
      return primarySidebarKey
    },
    get search() {
      return search
    },
  }
}
