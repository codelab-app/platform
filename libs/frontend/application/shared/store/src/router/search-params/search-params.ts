'use client'

import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { useSearchParams } from 'next/navigation'
import { pipe } from 'remeda'

import { parseSearchParamsPageProps } from './search-params.server'

/**
 * This version is used to get searchParams from the hook
 *
 * We use lazy loading since some may be called without others being set. We could require only `primarySidebarKey`. Could refactor to group them accordingly based on required/optional
 */
export const parseUrlSearchParams = (
  searchParams: URLSearchParams,
): SearchParamsPageProps => {
  const params = Object.fromEntries(searchParams.entries())
  const filter = searchParams.getAll('filter')
  const expandedNodes = searchParams.getAll('expandedNodes')

  return { ...params, expandedNodes, filter }
}

/**
 * Create a version to get search params page props, since passing `ReadonlyURLSearchParams` removes the `get` methods
 */
export const useSearchParamsProps = () => {
  // eslint-disable-next-line ban/ban
  const searchParams = useSearchParams()

  return pipe(searchParams, parseUrlSearchParams, parseSearchParamsPageProps)
}
