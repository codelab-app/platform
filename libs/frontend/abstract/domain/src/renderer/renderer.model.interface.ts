import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { ErrorBoundaryProps } from 'react-error-boundary'
import type { IExpressionTransformer } from '../builder'
import type {
  IElementModel,
  IElementTree,
  IEvaluationContext,
} from '../element'
import type { IPageNode, IPageNodeRef } from '../page'
import type { IActionRunner } from './action.runner.model.interface'
import type { IRenderOutput, IRenderPipe } from './render.interface'
import type {
  IRuntimeProp,
  ITypedPropTransformer,
} from './runtime.props.model.interface'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
  Production = 'production',
}

export interface IRendererModel {
  actionRunners: ObjectMap<IActionRunner>
  debugMode: boolean
  elementTree: Ref<IElementTree>
  expressionTransformer: IExpressionTransformer
  id: string
  providerTree: Nullable<Ref<IElementTree>>
  renderPipe: IRenderPipe
  rendererType: RendererType
  runtimeProps: ObjectMap<IRuntimeProp<IPageNode>>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  addRuntimeProps(nodeRef: IPageNodeRef): IRuntimeProp<IPageNode>
  getChildMapperChildren(element: IElementModel): Array<IElementModel>
  getChildPageChildren(element: IElementModel): Array<IElementModel>
  getComponentInstanceChildren(element: IElementModel): Array<IElementModel>
  logRendered(rendered: IRenderOutput): void
  renderIntermediateElement(element: IElementModel): IRenderOutput
  runPostRenderAction(element: IElementModel): void
  runPreRenderAction(element: IElementModel): void
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
