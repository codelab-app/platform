import type {
  IActionModel,
  IComponentModel,
  IElementModel,
  IElementTree,
  IExpressionTransformer,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { IPropData, IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { IRuntimeStore } from '../store/runtime-store.model.interface'
import type { IRuntimeAction } from './action.runner.model.interface'
import type { IRenderOutput, IRenderPipe } from './render.interface'
import type {
  IRuntimeBase,
  ITypedPropTransformer,
} from './runtime.model.interface'
import type { IRuntimeComponent } from './runtime-component.model'
import type { IRuntimeElement } from './runtime-element.model.interface'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
  Production = 'production',
}

export interface IRendererModel {
  debugMode: boolean
  elementTree: Ref<IElementTree>
  expressionTransformer: IExpressionTransformer
  id: string
  providerTree: Nullable<Ref<IElementTree>>
  renderPipe: IRenderPipe
  rendererType: RendererType
  runtimeComponents: ObjectMap<IRuntimeComponent>
  runtimeElements: ObjectMap<IRuntimeElement>
  // runtimeStores: ObjectMap<IRuntimeStore>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  addRuntimeComponent(component: IComponentModel): IRuntimeComponent
  addRuntimeElement(element: IElementModel): IRuntimeElement
  getChildMapperChildren(element: IElementModel): Array<IElementModel>
  getChildPageChildren(element: IElementModel): Array<IElementModel>
  getComponentInstanceChildren(element: IElementModel): Array<IElementModel>
  logRendered(rendered: IRenderOutput): void
  renderElement(element: IElementModel): Nullable<ReactElement>
  renderIntermediateElement(element: IElementModel): IRenderOutput
  runPostRenderAction(element: IRuntimeElement): void
  runPreRenderAction(element: IRuntimeElement): void
  // runtimeAction(action: IRef): IRuntimeAction
  runtimeComponent(component: IRef): IRuntimeComponent
  runtimeElement(element: IRef): IRuntimeElement
  shouldRenderElement(element: IRuntimeElement): boolean
}

export interface ElementWrapperProps {
  element: IElementModel
  errorBoundary: Omit<ErrorBoundaryProps, 'fallbackRender'>
  key: string
  /**
   * Props passed in from outside the component
   */
  renderOutput: IRenderOutput
  renderer: IRendererModel
  onRendered(): void
}
