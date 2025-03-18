import type { PageContextParams } from '@codelab/frontend/abstract/types'

export interface IPageBuilderRouteContext {
  params: PageContextParams
  type: IRouteType.Page
}
