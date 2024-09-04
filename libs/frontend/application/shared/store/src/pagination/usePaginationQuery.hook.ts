import { type ReadonlyURLSearchParams } from 'next/navigation'

/**
 * We want to transform the url query structure for pagination
 *
 * Take `?page=1&pageSize=10` and convert it to `{ page: 1, pageSize: 10 }`
 *
 */
export const usePaginationQuery = (searchParams: ReadonlyURLSearchParams) => {
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')

  return {
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
  }
}
