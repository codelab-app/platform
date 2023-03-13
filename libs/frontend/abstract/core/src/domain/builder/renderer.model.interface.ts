import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IElement, IElementTree } from '../element'
import type { IProp, IPropData } from '../prop'
import type { IRenderOutput } from '../render'
import type { IStore } from '../store'

export const enum RendererType {
  PageBuilder = 'page-builder',
  ComponentBuilder = 'component-builder',
  Preview = 'preview',
}
export interface IRenderer {
  providerTree: Nullable<Ref<IElementTree>>
  elementTree: Ref<IElementTree>
  appStore: Ref<IStore>
  debugMode: boolean
  rendererType: RendererType
  state: IProp
  renderRoot(): ReactElement | null
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  renderChildren(input: {
    parentOutput: IRenderOutput
  }): ArrayOrSingle<ReactNode>
  runPreAction(element: IElement): void
  getPostAction(element: IElement): Nullish<() => unknown>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  initForce(
    elementTree: IElementTree,
    providerTree?: Nullable<IElementTree>,
  ): void
}
