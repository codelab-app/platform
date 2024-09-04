import type {
  SearchParams,
  SearchParamsString,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type { RequiredPartial } from '@codelab/shared/abstract/types'

export interface IRouterProps {
  params: UrlParams
  searchParams: SearchParams
}

export type IRouterService = IRouterProps & {
  setParams(query: UrlParams): void
  setSearchParams(params: SearchParams): void
}
