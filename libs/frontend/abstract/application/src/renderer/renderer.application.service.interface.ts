import type {
  IComponentModel,
  IElementModel,
  IRendererDto,
  IRendererModel,
  IRenderOutput,
  IRuntimeComponent,
  IRuntimeElement,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'

export interface IRendererApplicationService {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  hydrate(props: IRendererDto): IRendererModel
  // mobx transformer takes a single param
  renderChildren([renderer, parentOutput]: [
    IRendererModel,
    IRenderOutput,
  ]): ArrayOrSingle<ReactNode>

  renderRoot(renderer: IRendererModel): ReactElement | null
  runtimeComponent(component: IComponentModel): IRuntimeComponent
  runtimeElement(element: IElementModel): IRuntimeElement
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
