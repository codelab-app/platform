import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'

import type { IElementTreeViewDataNode } from '../../builder'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'
import type { IRuntimeElementStyleModel } from './runtime-element-style.model.interface'

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

  compositeKey: string

  element: Ref<IElementModel>

  parentElement: Maybe<IRuntimeElementModel>
  parentElementKey: Nullable<string>
  pathFromRoot: Array<IRuntimeElementModel>
  postRenderActionDone: boolean
  preRenderActionDone: boolean
  /**
   * keep track of prop key if we are rendering typedProp of type ElementType
   * to generate correct compositeKey for children too
   */
  propKey?: string
  render: Nullable<ReactElement>
  renderChildren: ArrayOrSingle<ReactNode>
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
  style: IRuntimeElementStyleModel
  treeViewNode: IElementTreeViewDataNode

  cleanupChildMapperNodes(newKeys: Array<string>): void
  detach(): void
  runPostRenderAction(): void
  runPreRenderAction(): void
  setPostRenderActionDone(value: boolean): void
  setPreRenderActionDone(value: boolean): void
}
