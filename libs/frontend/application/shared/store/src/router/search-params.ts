import type { NextjsSearchParamsProps } from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  SearchParamsClientProps,
  SearchParamsServerProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'

/**
 * Parse the type only, we don't validate the existence of the params since client first pass render may be undefined
 */
export const parseSearchParams = (
  searchParams: SearchParamsServerProps,
): SearchParamsClientProps => {
  const { expandedKeys, filter, page, pageSize, selectedKey } = searchParams

  const parseArray = (key: string | Array<string> | undefined) =>
    key ? (Array.isArray(key) ? key : [key]) : []

  return {
    expandedKeys: parseArray(expandedKeys),
    filter: parseArray(filter),
    page: page ? parseInt(page, 10) : 1,
    pageSize: pageSize ? parseInt(pageSize, 10) : 20,
    selectedKey,
  }
}
