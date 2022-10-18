import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { IElement, IElementTree } from '../element'
import { IExtraElementProps, IPropData } from '../prop'
import { IRenderOutput } from '../render'
import { IStore } from '../store'

export interface IRenderer {
  renderRoot(): ReactElement | null
  appTree: Nullable<Ref<IElementTree>>
  appStore: Ref<IStore>
  pageTree: Nullable<Ref<IElementTree>>
  debugMode: boolean
  state: IPropData
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  extraElementProps: IExtraElementProps
  renderChildren(parentOutput: IRenderOutput): ArrayOrSingle<ReactNode>
  runPreAction(element: IElement): void
  getPostAction(element: IElement): Nullish<() => unknown>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  initForce(pageTree: IElementTree): void
}
