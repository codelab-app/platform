import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IExpressionTransformer } from '../builder'
import type { IElement, IElementTree } from '../element'
import type { IPageNode, IPageNodeRef } from '../page'
import type { IActionRunner } from './action.runner.model.interface'
import type { IRenderOutput } from './render.interface'
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
export interface IRenderer {
  actionRunners: ObjectMap<IActionRunner>
  debugMode: boolean
  elementTree: Ref<IElementTree>
  expressionTransformer: IExpressionTransformer
  id: string
  providerTree: Nullable<Ref<IElementTree>>
  rendererType: RendererType
  runtimeProps: ObjectMap<IRuntimeProp<IPageNode>>
  typedPropTransformers: ObjectMap<ITypedPropTransformer>
  urlSegments?: Record<string, string>

  addRuntimeProps(nodeRef: IPageNodeRef): IRuntimeProp<IPageNode>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  renderChildren(parentOutput: IRenderOutput): ArrayOrSingle<ReactNode>
  renderElement(element: IElement): ReactElement
  renderIntermediateElement(element: IElement): IRenderOutput
  renderRoot(): ReactElement | null
}
