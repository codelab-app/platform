import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'

import type { IRouteType } from '../shared'

export type ComponentContextParams<T extends ObjectLike = ObjectLike> = Pick<
  UrlParams,
  'componentId'
> &
  T

export interface IComponentBuilderRouteContext {
  params: ComponentContextParams
  type: IRouteType.Component
}
