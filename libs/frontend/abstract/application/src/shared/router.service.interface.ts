import type {
  UrlPathParams,
  UrlPathParamsProps,
  UrlQueryParams,
  UrlQueryParamsPageProps,
  UrlQueryParamsProps,
} from '@codelab/frontend/abstract/types'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { IPaginationService, SupportedPaginationModel } from '../services'

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
  queryParams?: UrlQueryParamsPageProps
}

export type IRouterService = UrlPathParams &
  UrlQueryParams & {
    pathParams: UrlPathParamsProps
    queryParams: UrlQueryParamsProps

    setPathParams(params: UrlPathParams): void
    setQueryParams(params: Partial<UrlQueryParamsProps>): void
  }
