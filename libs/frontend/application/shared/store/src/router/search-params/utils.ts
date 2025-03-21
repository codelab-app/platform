'use client'

import type {
  IPaginationSearchParams,
  SupportedPaginationPathname,
} from '@codelab/frontend/abstract/application'

import { useRouter } from 'next/navigation'

export const useRedirectPaginationRoute = (
  params: IPaginationSearchParams,
  pathname: SupportedPaginationPathname,
) => {
  const router = useRouter()

  return (setParams: (params: IPaginationSearchParams) => void) => {
    setParams(params)

    // Use the provided baseUrl or current pathname
    const url = pathname

    console.log(params)

    const searchParams = new URLSearchParams()

    // Add each parameter to searchParams
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString())
      }
    })

    const newUrl = `${url}?${searchParams.toString()}`

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
