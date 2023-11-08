import type {
  IComponentModel,
  IElementModel,
  IHydrateable,
  IPageModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimeStoreModel } from './runtime-store'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  renderRoot(renderer: IRendererModel): ReactElement | null
  runtimeContainerNode(
    node: IComponentModel | IPageModel,
  ): Maybe<IRuntimeContainerNodeModel>
  runtimeElement(element: IElementModel): Maybe<IRuntimeElementModel>
  runtimeStore(storeModel: IStoreModel): Maybe<IRuntimeStoreModel>
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
