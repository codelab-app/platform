import type {
  SearchParamsContext,
  SearchParamsProps,
  UrlParamsProps,
  ValidatedUrlParamsProps,
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
  searchParams?: SearchParamsProps
}

export type IRouterService = SearchParamsContext & {
  searchParams: SearchParamsProps

  setSearchParams(params: SearchParamsProps): void
}
