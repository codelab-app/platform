import type {
  ObjectLike,
  UnknownObjectLike,
} from '@codelab/shared-abstract-types'

import type {
  ComponentContextParams,
  IComponentBuilderRoute,
} from '../component'
import type { IPageBuilderRoute, PageContextParams } from '../page'

export type BuilderContextParams<T extends ObjectLike = UnknownObjectLike> =
  ComponentContextParams & PageContextParams<T>

/**
 * Used by base components shared by page/component builder
 */
export type IBuilderRoute<T extends ObjectLike = UnknownObjectLike> =
  | IComponentBuilderRoute
  | IPageBuilderRoute
