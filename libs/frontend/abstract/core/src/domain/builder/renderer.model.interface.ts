import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IElement, IElementTree } from '../element'
import type { IPropData } from '../prop'
import type { IRenderOutput } from '../render'
import type { IExpressionTransformer } from './expression-transformer.service.interface'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
}
export interface IRenderer {
  debugMode: boolean
  elementTree: Ref<IElementTree>
  expressionTransformer: IExpressionTransformer
  providerTree: Nullable<Ref<IElementTree>>
  rendererType: RendererType

  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  renderChildren(input: {
    parentOutput: IRenderOutput
    extraProps?: IPropData
  }): ArrayOrSingle<ReactNode>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  renderRoot(): ReactElement | null
}
