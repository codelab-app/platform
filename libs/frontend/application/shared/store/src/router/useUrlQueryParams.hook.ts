'use client'

import type {
  UrlQueryParams,
  UrlQueryParamsString,
} from '@codelab/frontend/abstract/types'
import { useSearchParams } from 'next/navigation'

export const useUrlQueryParams = (): UrlQueryParams => {
  const searchParams = useSearchParams()
  const filter = searchParams.getAll('filter')
  const page = searchParams.get('page') ?? undefined
  const pageSize = searchParams.get('pageSize') ?? undefined
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
    filter: filter && filter.length ? filter : undefined,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    primarySidebarKey: primarySidebarKey ?? undefined,
    search: search ?? undefined,
  }
}
