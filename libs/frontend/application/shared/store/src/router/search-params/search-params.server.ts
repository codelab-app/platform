import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type {
  SearchParamsPageProps,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'

/**
 * This is used to parse the search param props that come in pages
 */
export const parseSearchParamsPageProps = (
  searchParams: SearchParamsPageProps,
): SearchParamsProps => {
  const { filter, node, page, pageSize, primarySidebarKey, search, ...rest } =
    searchParams

  return {
    filter: filter ? (Array.isArray(filter) ? filter : [filter]) : undefined,
    node,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    primarySidebarKey: primarySidebarKey ?? undefined,
    search: search ?? undefined,
    // this is dynamic page query params that can be accessed in expressions with "urlProps" api
    ...rest,
  }
}

export const parsePaginationSearchParams = (
  searchParams: SearchParamsPageProps,
): IPaginationSearchParams => {
  const { filter = 'name', page = '1', pageSize = '20' } = searchParams

  /**
   * If used in server page parallel slots, the page could be activated when there are no search params
   */
  // if (!filter || !page || !pageSize) {
  //   throw new Error('filter, page, pageSize are required')
  // }

  return {
    filter: Array.isArray(filter) ? filter.join(',') : filter,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  }
}
