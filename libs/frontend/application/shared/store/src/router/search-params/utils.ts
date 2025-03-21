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

  // Add logging to the redirect function too
  return (setParams: (params: IPaginationSearchParams) => void) => {
    console.log('Redirect: Before setting params:', params)
    setParams(params)
    console.log('Redirect: After setting params:', params)

    // Convert IPaginationSearchParams to URLSearchParams
    const urlParams = new URLSearchParams()

    if (params.filter) {
      urlParams.set('filter', params.filter)
    }

    urlParams.set('page', params.page.toString())
    urlParams.set('pageSize', params.pageSize.toString())

    // Use the provided pathname
    const url = pathname
    const newUrl = `${url}?${urlParams.toString()}`

    // Update URL immediately in the address bar before router push
    window.history.replaceState({}, '', newUrl)

    // Then push to router for proper Next.js navigation handling
    router.push(newUrl)
  }
}

/**
 * Hook to prefetch adjacent pagination pages for smoother navigation experience
 */
export const usePrefetchPaginationRoutes = (
  params: IPaginationSearchParams,
  pathname: SupportedPaginationPathname,
  totalItems: number,
) => {
  const router = useRouter()

  /**
   * Creates a URL for a specific page based on current params
   */
  const createPageUrl = (page: number) => {
    // Create a copy of the current search params
    const newParams: IPaginationSearchParams = {
      ...params,
      page,
    }

    // Convert to URLSearchParams
    const urlParams = new URLSearchParams()

    if (newParams.filter) {
      urlParams.set('filter', newParams.filter)
    }

    urlParams.set('page', newParams.page.toString())
    urlParams.set('pageSize', newParams.pageSize.toString())

    return `${pathname}?${urlParams.toString()}`
  }

  /**
   * Prefetches next and previous pages if they exist
   */
  const prefetchAdjacentPages = () => {
    console.log('Prefetching adjacent pages')

    const currentPage = Number(params.page || 1)
    const pageSize = Number(params.pageSize || 10)
    const totalPages = Math.ceil(totalItems / pageSize)

    // Prefetch next page if it exists
    if (currentPage < totalPages) {
      console.log('Prefetching next page')

      const nextPageUrl = createPageUrl(currentPage + 1)

      router.prefetch(nextPageUrl)
    }

    // Prefetch previous page if it exists
    if (currentPage > 1) {
      console.log('Prefetching previous page')

      const prevPageUrl = createPageUrl(currentPage - 1)

      router.prefetch(prevPageUrl)
    }
  }

  return { prefetchAdjacentPages }
}

export const searchParamsAsObject = (keys?: Array<string>) => {
  const searchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(searchParams.entries())
}
