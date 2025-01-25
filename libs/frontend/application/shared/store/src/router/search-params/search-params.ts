'use client'

import type {
  SearchParamsPageProps,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'

import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { pipe } from 'remeda'

/**
 * This version is used to get searchParams from the hook
 *
 * We use lazy loading since some may be called without others being set. We could require only `primarySidebarKey`. Could refactor to group them accordingly based on required/optional
 */
export const parseUrlSearchParams = (
  searchParams: URLSearchParams,
): SearchParamsPageProps => {
  const page = searchParams.get('page') ?? undefined
  const pageSize = searchParams.get('pageSize') ?? undefined
  const filter = searchParams.getAll('filter')
  const primarySidebarKey = searchParams.get('primarySidebarKey') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const node = searchParams.get('node') ?? undefined

  return {
    filter,
    node,
    page,
    pageSize,
    primarySidebarKey,
    search,
  }
}

/**
 * This is used to parse the search param props that come in pages
 */
export const parseSearchParamsPageProps = (
  params: SearchParamsPageProps,
): SearchParamsProps => {
  const { filter, node, page, pageSize, primarySidebarKey, search } = params

  return {
    filter: filter ? (Array.isArray(filter) ? filter : [filter]) : undefined,
    node,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    primarySidebarKey: primarySidebarKey ?? undefined,
    search: search ?? undefined,
  }
}

/**
 * Create a version to get search params page props, since passing `ReadonlyURLSearchParams` removes the `get` methods
 */
export const useSearchParamsProps = () => {
  // eslint-disable-next-line ban/ban
  const searchParams = useSearchParams()

  return parseUrlSearchParams(searchParams)
}
