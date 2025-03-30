import type { TreeViewClientProps } from '@codelab/frontend/abstract/types'
import type {
  ObjectLike,
  UnknownObjectLike,
} from '@codelab/shared/abstract/types'

import type {
  ComponentContextParams,
  IComponentBuilderRoute,
} from '../component'
import type { IPageBuilderRoute, PageContextParams } from '../page'
import type { IRouteType } from '../shared'

export type BuilderContextParams<T extends ObjectLike = UnknownObjectLike> =
  ComponentContextParams & PageContextParams<T>

/**
 * Used by base components shared by page/component builder
 */
export type IBuilderRoute<T extends ObjectLike = UnknownObjectLike> =
  | IComponentBuilderRoute
  | IPageBuilderRoute
