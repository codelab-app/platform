import type {
  SearchParamsContext,
  SearchParamsProps,
} from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'

export interface IRouterService {
  searchParams: ObjectLike
  setSearchParams(props: URLSearchParams): void
}
