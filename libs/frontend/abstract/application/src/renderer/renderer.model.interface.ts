import type {
  IComponentModel,
  IElementModel,
  IElementTree,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { IRenderOutput, IRenderPipe } from './render.interface'
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
  containerNode: IComponentModel | IPageModel
  debugMode: boolean
  elementTree: Ref<IElementTree>
  expressionTransformer: IExpressionTransformer
  id: string
  renderPipe: IRenderPipe
  rendererType: RendererType
  rootElement: IElementModel
  runtimeRootContainerNode: Nullable<IRuntimeContainerNodeModel>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  render(): Nullable<ReactElement>
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
