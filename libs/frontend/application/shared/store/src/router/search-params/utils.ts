'use client'

import type {
  SearchParamsPageProps,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'

import { useSearchParams } from 'next/navigation'

import { useSearchParamsProps } from './search-params'

export const useUpdateSearchParams = () => {
  // eslint-disable-next-line ban/ban
  const params = useSearchParams()

  const updateParams = (
    setParams: (params: URLSearchParams) => void,
    baseUrl?: string,
  ) => {
    setParams(params)

    const url = baseUrl
      ? `${baseUrl}?${params.toString()}`
      : `?${params.toString()}`

    window.history.pushState(null, '', url)
  }

  return {
    updateParams,
  }
}

export const searchParamsAsObject = (keys?: Array<string>) => {
  const searchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(searchParams.entries())
}
