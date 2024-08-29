import type { UrlParams, UrlQuery } from '@codelab/frontend/abstract/types'
import type { Nullable } from '@codelab/shared/abstract/types'

export interface IRouterProps {
  params: Nullable<UrlParams>
  query: Nullable<UrlQuery>
}

export type IRouterService = IRouterProps &
  UrlParams &
  UrlQuery & {
    update(router: Partial<IRouterProps>): void
  }
