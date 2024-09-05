import type {
  UrlPathParams,
  UrlQueryParams,
  UrlQueryParamsString,
} from '@codelab/frontend/abstract/types'
import type { DeepNonNullable } from 'utility-types'

/**
 * Props use the string version
 */
export interface IRouterProps {
  pathParams: UrlPathParams
  queryParams: UrlQueryParamsString
}

export type IRouterService = DeepNonNullable<UrlPathParams & UrlQueryParams> & {
  pathParams: UrlPathParams
  queryParams: UrlQueryParams

  setPathParams(params: UrlPathParams): void
  setQueryParams(params: UrlQueryParams): void
}
