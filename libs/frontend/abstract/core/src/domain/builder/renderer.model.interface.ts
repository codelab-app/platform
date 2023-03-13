import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IElement, IElementTree } from '../element'
import type { IProp, IPropData } from '../prop'
import type { IRenderOutput } from '../render'
import type { IStore } from '../store'

export const enum RendererType {
  ComponentBuilder = 'component-builder',
  PageBuilder = 'page-builder',
  Preview = 'preview',
}
export interface IRenderer {
  appStore: Ref<IStore>
  debugMode: boolean
  elementTree: Ref<IElementTree>
  providerTree: Nullable<Ref<IElementTree>>
  rendererType: RendererType
  state: IProp

  getPostAction(element: IElement): Nullish<() => unknown>
  initForce(
    elementTree: IElementTree,
    providerTree?: Nullable<IElementTree>,
  ): void
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  renderChildren(input: {
    parentOutput: IRenderOutput
  }): ArrayOrSingle<ReactNode>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  renderRoot(): ReactElement | null
  runPreAction(element: IElement): void
}
