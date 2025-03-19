import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'

import type { IRouteType } from '../shared'

export type ComponentContextParams<T extends ObjectLike = ObjectLike> = Pick<
  ValidatedUrlParamsProps,
  'componentId'
> &
  T

export interface IComponentBuilderRouteContext {
  params: ComponentContextParams
  type: IRouteType.Component
}
