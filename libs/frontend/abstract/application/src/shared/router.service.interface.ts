import type { UrlParams, UrlQuery } from '@codelab/frontend/abstract/types'
import type { RequiredPartial } from '@codelab/shared/abstract/types'

export interface IRouterProps {
  params: Partial<UrlParams>
  query: Partial<UrlQuery>
}

export type IRouterService = IRouterProps &
  RequiredPartial<UrlParams> &
  UrlQuery & {
    update(router: Partial<IRouterProps>): void
  }
