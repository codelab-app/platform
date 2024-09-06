'use client'

import type {
  UrlQueryParams,
  UrlQueryParamsString,
} from '@codelab/frontend/abstract/types'
import { Validator } from '@codelab/shared/infra/schema'
import { useSearchParams } from 'next/navigation'

export const useUrlQueryParams = (): UrlQueryParams => {
  const searchParams = useSearchParams()
  const filter = Validator.parseDefined(searchParams.getAll('filter'))
  const page = Validator.parseDefined(searchParams.get('page'))
  const pageSize = Validator.parseDefined(searchParams.get('pageSize'))
  const primarySidebarKey = searchParams.get('primarySidebarKey') ?? undefined
  const search = searchParams.get('search') ?? undefined

  return parseUrlQueryParams({
    filter,
    page,
    pageSize,
    primarySidebarKey,
    search,
  })
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
