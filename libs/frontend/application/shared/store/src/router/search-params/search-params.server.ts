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
