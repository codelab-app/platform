import type {
  IComponentModel,
  IElementModel,
  IElementTreeViewDataNode,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * This model is the runtime model for IElementModel
 * it reflects the same structure
 */
export interface IRuntimeElementModel extends AnyModel {
  /**
   * Runtime children
   */
  children: Array<
    IRuntimeComponentModel | IRuntimeElementModel | IRuntimePageModel
  >
  /**
   * The runtime model for IElementModel.closestContainerNode
   */
  closestContainerNode: Ref<IRuntimeComponentModel | IRuntimePageModel>

  element: Ref<IElementModel>

  id: string

  postRenderActionDone: boolean
  preRenderActionDone: boolean

  render: Nullable<ReactElement>
  renderChildren: ArrayOrSingle<ReactNode>
  runtimeElementsList: Array<IRuntimeElementModel>

  /**
   * Runtime version of IElementModel.prop
   * serves props transformations and evaluation
   */
  runtimeProps: IRuntimeElementPropModel
  /**
   * access runtimeStore via computed values
   */
  runtimeStore: IRuntimeStoreModel
  /**
   * Return if we should render element or not based on renderIfExpression
   */
  shouldRender: boolean

  treeViewNode: IElementTreeViewDataNode

  addComponent(
    node: IComponentModel,
    runtimeParent: IRef,
    children?: Array<Ref<IElementModel>>,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel
  addElement(node: IElementModel): IRuntimeElementModel

  cleanupChildMapperNodes(validNodes: Array<IRuntimeComponentModel>): void
  runPostRenderAction(): void
  runPreRenderAction(): void
  setPostRenderActionDone(value: boolean): void
  setPreRenderActionDone(value: boolean): void
}
