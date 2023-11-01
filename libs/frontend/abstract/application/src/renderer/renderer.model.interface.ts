import type {
  IComponentModel,
  IElementModel,
  IElementTree,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { IRenderOutput, IRenderPipe } from './render.interface'
import type { ITypedPropTransformer } from './runtime.model.interface'
import type { IRuntimeActionModel } from './runtime-action'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { IRuntimeElementModel } from './runtime-element'

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
  runtimeContainerNode: ObjectMap<IRuntimeContainerNodeModel>
  // runtimeStores: ObjectMap<IRuntimeStore>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  addRuntimeContainerNode(
    node: IComponentModel | IPageModel,
  ): IRuntimeContainerNodeModel
  addRuntimeElement(element: IElementModel): IRuntimeElementModel
  getChildMapperChildren(element: IElementModel): Array<IElementModel>
  getChildPageChildren(element: IElementModel): Array<IElementModel>
  getComponentInstanceChildren(element: IElementModel): Array<IElementModel>
  logRendered(rendered: IRenderOutput): void
  renderElement(element: IElementModel): Nullable<ReactElement>
  renderIntermediateElement(element: IElementModel): IRenderOutput
  runPostRenderAction(element: IRuntimeElementModel): void
  runPreRenderAction(element: IRuntimeElementModel): void
  runtimeAction(action: IRef): IRuntimeActionModel
  runtimeElement(element: IRef): IRuntimeElementModel
  shouldRenderElement(element: IRuntimeElementModel): boolean
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
