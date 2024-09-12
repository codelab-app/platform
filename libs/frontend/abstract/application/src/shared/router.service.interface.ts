import type {
  UrlPathParams,
  UrlQueryParams,
  UrlQueryParamsString,
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
  pathParams: UrlPathParams
  queryParams?: UrlQueryParamsString
}

export type IRouterService = UrlPathParams &
  UrlQueryParams & {
    pathParams: UrlPathParams
    queryParams: UrlQueryParams

    setPathParams(params: UrlPathParams): void
    setQueryParams(params: Partial<UrlQueryParams>): void
  }
