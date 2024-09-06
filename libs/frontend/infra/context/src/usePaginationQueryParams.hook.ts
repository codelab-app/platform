'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { useEffect } from 'react'

/**
 * Takes in search params and set default, then sync the url with the query params
 *
 * @param page @string Default search param value
 * @param pageSize @string Default search param value
 */
export const usePaginationQueryParams = (page = '1', pageSize = '20') => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currentPage = searchParams.get('page')
    const currentPageSize = searchParams.get('pageSize')

    if (currentPage !== '1' || currentPageSize !== '1') {
      const url = queryString.stringifyUrl({
        query: {
          page,
          pageSize,
        },
        url: pathname,
      })

      router.replace(url)
    }
  }, [page, pageSize])
}
