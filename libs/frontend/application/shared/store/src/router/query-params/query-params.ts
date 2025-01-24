import type {
  URLSeachParamPageProps,
  URLSearchParamsProps,
} from '@codelab/frontend/abstract/types'

/**
 * This version is used to get searchParams from the hook
 *
 * We use lazy loading since some may be called without others being set. We could require only `primarySidebarKey`. Could refactor to group them accordingly based on required/optional
 */
export const parseQueryParams = (
  searchParams: URLSearchParams,
): URLSeachParamPageProps => {
  const page = searchParams.get('page') ?? undefined
  const pageSize = searchParams.get('pageSize') ?? undefined
  const filter = searchParams.getAll('filter')
  const primarySidebarKey = searchParams.get('primarySidebarKey') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const node = searchParams.get('node') ?? undefined

  return {
    filter,
    node,
    page,
    pageSize,
    primarySidebarKey,
    search,
  }
}

/**
 * This is used to parse the search param props that come in pages
 */
export const parseQueryParamPageProps = (
  params: URLSeachParamPageProps,
): URLSearchParamsProps => {
  const { filter, node, page, pageSize, primarySidebarKey, search } = params

  return {
    filter: filter ? (Array.isArray(filter) ? filter : [filter]) : undefined,
    node,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    primarySidebarKey: primarySidebarKey ?? undefined,
    search: search ?? undefined,
  }
}
