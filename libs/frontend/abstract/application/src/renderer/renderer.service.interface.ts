import type {
  IComponentModel,
  IElementModel,
  IElementTree,
  IHydrateable,
  IPageModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeComponentModel } from './runtime-component'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'
import type { IRuntimeStoreModel } from './runtime-store'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeElementTree: Maybe<IElementTree>
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  renderRoot(renderer: IRendererModel): ReactElement | null
  runtimeComponent(component: IComponentModel): Maybe<IRuntimeComponentModel>
  runtimeElement(element: IElementModel): Maybe<IRuntimeElementModel>
  runtimePage(page: IPageModel): Maybe<IRuntimePageModel>
  runtimeStore(store: IStoreModel): Maybe<IRuntimeStoreModel>
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
