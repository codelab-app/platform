import type {
  SearchParamsContext,
  SearchParamsPageProps,
  SearchParamsProps,
  UrlPathParams,
  UrlPathParamsProps,
} from '@codelab/frontend/abstract/types'

/**
 * Props use the string version
 *
 * @param queryParams - layouts do not receive searchParams
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/layout#layouts-do-not-receive-searchparams
 *
 */
export interface IRouterProps {
  pathParams: UrlPathParamsProps
  searchParams?: SearchParamsProps
}

export type IRouterService = UrlPathParams &
  SearchParamsContext & {
    pathParams: UrlPathParamsProps
    searchParams: SearchParamsProps

    setPathParams(params: UrlPathParams): void
    setSearchParams(params: Partial<SearchParamsProps>): void
  }
