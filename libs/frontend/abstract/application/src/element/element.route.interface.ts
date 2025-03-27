import type { UrlParams } from '@codelab/frontend/abstract/types'

import type { IRouteType } from '../shared'

export type ElementContextParams = Pick<UrlParams, 'elementId'>
export interface IElementRoute {
  params: ElementContextParams
  type: IRouteType.Page
}
