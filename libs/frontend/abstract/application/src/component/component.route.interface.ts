import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'

import type { IRouteType } from '../shared'

export type ComponentContextParams = Pick<
  ValidatedUrlParamsProps,
  'componentId'
>

export interface IComponentBuilderRouteContext {
  params: ComponentContextParams
  type: IRouteType.Component
}
