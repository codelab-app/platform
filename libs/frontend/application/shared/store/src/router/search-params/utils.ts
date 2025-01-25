'use client'

import type {
  SearchParamsPageProps,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useSearchParamsProps } from './search-params'

/**
 * This updates the Next.js url bar, and adds to history
 */
export const useUpdateSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  // eslint-disable-next-line ban/ban
  const params = useSearchParams()

  const updateParams = (
    setParams: (params: URLSearchParams) => void,
    baseUrl?: string,
  ) => {
    const newParams = new URLSearchParams(params)

    setParams(newParams)

    // Use the provided baseUrl or current pathname
    const url = baseUrl || pathname

    router.push(`${url}?${newParams.toString()}`)
  }

  return {
    updateParams,
  }
}

export const searchParamsAsObject = (keys?: Array<string>) => {
  const searchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(searchParams.entries())
}
