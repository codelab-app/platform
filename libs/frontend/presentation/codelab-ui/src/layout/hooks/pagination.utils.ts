import type { NextjsSearchParamsProps } from '@codelab/frontend-abstract-application'

/**
 * Creates a URL with the provided params
 */
export const createUrlWithParams = (
  pathname: string,
  params: NextjsSearchParamsProps,
): string => {
  const urlParams = new URLSearchParams()

  // Set all provided params
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      urlParams.set(key, Array.isArray(value) ? value.join(',') : value)
    }
  })

  return `${pathname}?${urlParams.toString()}`
}

/**
 * Creates a URL for search functionality
 */
export const createSearchUrl = (
  pathname: string,
  search: string,
  pageSize: number,
): string => {
  // Reset to first page when searching
  return createUrlWithParams(pathname, {
    filter: search,
    page: '1',
    pageSize: pageSize.toString(),
    search: search,
  })
}

/**
 * Creates a URL for pagination
 */
export const createPageUrl = (
  pathname: string,
  pageNum: number,
  pageSize: number,
  filter?: string | Array<string>,
  search?: string,
): string => {
  return createUrlWithParams(pathname, {
    filter: filter || '',
    page: pageNum.toString(),
    pageSize: pageSize.toString(),
    search: search || '',
  })
}
