import type {
  SearchParamsContext,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'

export type IRouterService = SearchParamsContext & {
  searchParams: SearchParamsProps

  setSearchParams(params: SearchParamsProps): void
}
