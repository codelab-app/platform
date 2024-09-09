'use client'

import type {
  UrlQueryParams,
  UrlQueryParamsString,
} from '@codelab/frontend/abstract/types'
import { Validator } from '@codelab/shared/infra/schema'
import { useSearchParams } from 'next/navigation'

export const useUrlQueryParams = (): UrlQueryParams => {
  const searchParams = useSearchParams()

  return {
    get filter() {
      return Validator.parseDefined(searchParams.getAll('filter'))
    },
    get page() {
      return parseInt(Validator.parseDefined(searchParams.get('page')), 10)
    },
    get pageSize() {
      return parseInt(Validator.parseDefined(searchParams.get('pageSize')), 10)
    },
    get primarySidebarKey() {
      return searchParams.get('primarySidebarKey') ?? undefined
    },
    get search() {
      return searchParams.get('search') ?? undefined
    },
  }
}

export const parseUrlQueryParams = (params: UrlQueryParamsString) => {
  const { filter, page, pageSize, primarySidebarKey, search } = params

  return {
    filter,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
    primarySidebarKey: primarySidebarKey ?? undefined,
    search: search ?? undefined,
  }
}
