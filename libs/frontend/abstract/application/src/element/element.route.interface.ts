import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'

import type { IRouteType } from '../shared'

export type ElementContextParams = Pick<ValidatedUrlParamsProps, 'elementId'>
export interface IElementRouteContext {
  params: ElementContextParams
  type: IRouteType.Page
}
