import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IElement, IElementTree } from '../element'
import type { IExtraElementProps, IProp, IPropData } from '../prop'
import type { IRenderOutput } from '../render'
import type { IStore } from '../store'

export interface IRenderer {
  renderRoot(): ReactElement | null
  appTree: Nullable<Ref<IElementTree>>
  appStore: Ref<IStore>
  pageTree: Nullable<Ref<IElementTree>>
  debugMode: boolean
  isBuilder: boolean
  state: IProp
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  extraElementProps: IExtraElementProps
  renderComponentMeta: IPropData
  renderChildren(parentOutput: IRenderOutput): ArrayOrSingle<ReactNode>
  runPreAction(element: IElement): void
  getPostAction(element: IElement): Nullish<() => unknown>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  initForce(pageTree: IElementTree, appTree?: Nullable<IElementTree>): void
}
