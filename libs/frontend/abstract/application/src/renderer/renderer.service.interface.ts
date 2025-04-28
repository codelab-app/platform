import type {
  IElementTree,
  IHydrateable,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'

import type { IExpressionTransformer } from '../builder'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeElementTree: Maybe<IElementTree>
  activeRenderer: Nullable<Ref<IRendererModel>>
  expressionTransformer: IExpressionTransformer
  renderers: ObjectMap<IRendererModel>
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
