import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { AnyModel, ModelClass, Ref } from 'mobx-keystone'
import { ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { IElement, IElementTree } from '../element'
import { IExtraElementProps, IPropData } from '../prop'
import { IRenderOutput } from '../render'

export interface IRenderer {
  renderRoot(): ReactElement | null
  appTree: Nullable<Ref<IElementTree>>
  pageTree: Nullable<Ref<IElementTree>>
  platformState?: any
  debugMode: boolean
  setPlatformState: (platformState?: any) => void
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  extraElementProps: IExtraElementProps
  renderChildren(parentOutput: IRenderOutput): ArrayOrSingle<ReactNode>
  renderElement(element: IElement, extraProps?: IPropData): ReactElement
  initForce(
    pageTree: IElementTree,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ): void
}
