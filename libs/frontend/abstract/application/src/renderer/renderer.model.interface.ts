import type {
  IComponentModel,
  IElementTree,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { IRenderOutput, IRenderPipe } from './render.interface'
import type { IRuntimeModel } from './runtime.model.interface'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { IRuntimeElementModel } from './runtime-element'
import type { ITypedPropTransformer } from './typed-prop-transformer.interface'

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
  runtimeContainerNodes: ObjectMap<IRuntimeContainerNodeModel>
  // runtimeStores: ObjectMap<IRuntimeStore>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  addRuntimeContainerNode(
    containerNode: IComponentModel | IPageModel,
    parent?: IRuntimeModel,
  ): IRuntimeContainerNodeModel
  logRendered(rendered: IRenderOutput): void
  runPostRenderAction(element: IRuntimeElementModel): void
  runPreRenderAction(element: IRuntimeElementModel): void
  shouldRenderElement(element: IRuntimeElementModel): boolean
}

export interface ElementWrapperProps {
  errorBoundary: Omit<ErrorBoundaryProps, 'fallbackRender'>
  key: string
  /**
   * Props passed in from outside the component
   */
  renderOutput: IRenderOutput
  renderer: IRendererModel
  runtimeElement: IRuntimeElementModel
  onRendered(): void
}
