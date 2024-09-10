import type {
  IElementTree,
  IHydrateable,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, ObjectMap, Ref } from 'mobx-keystone'
import type { IElementService } from '../element'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'

export interface IRenderSideEffects {
  syncModifiedElements: IElementService['syncModifiedElements']
}

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeElementTree: Maybe<IElementTree>
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>
  sideEffects: IRenderSideEffects
  setActiveRenderer(renderer: Ref<IRendererModel>): void
  setSideEffects(sideEffects: IRenderSideEffects): void
}
