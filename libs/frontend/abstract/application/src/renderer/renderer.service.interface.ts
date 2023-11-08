import type {
  IComponentModel,
  IElementModel,
  IHydrateable,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { IRuntimeElementModel } from './runtime-element'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  getRuntimeContainerNode(
    node: IComponentModel | IPageModel,
  ): Maybe<IRuntimeContainerNodeModel>
  getRuntimeElement(element: IElementModel): Maybe<IRuntimeElementModel>
  renderRoot(renderer: IRendererModel): ReactElement | null
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
