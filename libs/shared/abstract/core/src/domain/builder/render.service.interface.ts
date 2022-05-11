import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { AnyModel, ModelClass } from 'mobx-keystone'
import { ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { IElement, IElementTree } from '../element'
import { IExtraElementProps, IPropData } from '../prop'
import { IRenderOutput } from '../render'

export interface IRenderService {
  renderRoot(): ReactElement | null
  tree: Nullable<IElementTree>
  platformState?: any
  isInitialized: boolean
  debugMode: boolean
  renderIntermediateElement(
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput>
  logRendered(element: IElement, rendered: ArrayOrSingle<IRenderOutput>): void
  extraElementProps: IExtraElementProps
  renderChildren(parentOutput: IRenderOutput): ArrayOrSingle<ReactNode>
  init(
    tree: IElementTree,
    providerTree?: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ): void
}
