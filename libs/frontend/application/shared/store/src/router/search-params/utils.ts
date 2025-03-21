'use client'

import type {
  SupportedPaginationModel,
  SupportedPaginationPathname,
} from '@codelab/frontend/abstract/application'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
    const newUrl = `${url}?${newParams.toString()}`

    // Update URL immediately in the address bar before router push
    window.history.replaceState({}, '', newUrl)

    // Then push to router for proper Next.js navigation handling
    router.push(newUrl)
  }

  return updateParams
}

export const useRedirectPaginationRoute = (
  searchParams: SearchParamsPageProps,
  pathname: SupportedPaginationPathname,
) => {
  const router = useRouter()
  const newParams = new URLSearchParams(searchParams as URLSearchParams)

  return (setParams: (params: URLSearchParams) => void) => {
    setParams(newParams)

    // Use the provided baseUrl or current pathname
    const url = pathname
    const newUrl = `${url}?${newParams.toString()}`

    // Update URL immediately in the address bar before router push
    window.history.replaceState({}, '', newUrl)

    // Then push to router for proper Next.js navigation handling
    router.push(newUrl)
  }
}

export const searchParamsAsObject = (keys?: Array<string>) => {
  const searchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(searchParams.entries())
}
