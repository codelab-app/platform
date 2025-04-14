import type {
  TreeViewClientProps,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'

import type { IRouteType } from '../shared'

export type ComponentContextParams<T extends ObjectLike = ObjectLike> = Pick<
  UrlParams,
  'componentId'
> &
  T

export interface IComponentBuilderRoute {
  params: ComponentContextParams
  searchParams: TreeViewClientProps
  type: IRouteType.Component
}
