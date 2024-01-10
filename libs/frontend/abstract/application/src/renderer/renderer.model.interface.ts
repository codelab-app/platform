import type {
  IComponentModel,
  IElementModel,
  IExpressionTransformer,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'
import type { IRenderOutput, IRenderPipe } from './render.interface'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { ITypedPropTransformer } from './typed-prop-transformer.interface'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
  Production = 'production',
}

export interface IRendererModel {
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  debugMode: boolean
  expressionTransformer: IExpressionTransformer
  id: string
  render: Nullable<ReactElement>
  renderPipe: IRenderPipe
  rendererType: RendererType
  rootElement: IElementModel
  runtimeRootContainerNode: IRuntimeContainerNodeModel
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>
}

export interface ElementWrapperProps {
  children: ArrayOrSingle<React.ReactNode>
  element: IElementModel
  errorBoundary: Omit<ErrorBoundaryProps, 'fallbackRender'>
  key: string
  /**
   * Props passed in from outside the component
   */
  renderOutput: IRenderOutput
  renderer: IRendererModel
  runtimeId: string
  onRendered(): void
}
