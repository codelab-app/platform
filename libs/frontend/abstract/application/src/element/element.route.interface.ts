import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'

import { IPageType } from '@codelab/shared/abstract/core'

import type { IRouteType } from '../shared'

export type ElementContextParams = Pick<ValidatedUrlParamsProps, 'componentId'>
export interface IElementRouteContext {
  params: ElementContextParams
  type: IRouteType.Page
}
