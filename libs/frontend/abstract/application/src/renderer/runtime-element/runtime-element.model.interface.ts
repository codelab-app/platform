import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'

import type { IBaseRuntimeModel } from '../runtime.model.interface'
import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeElementDto } from './runtime-element.dto'
import type { IRuntimeElementStyleModel } from './runtime-element-style.model.interface'

/**
 * This model is the runtime model for IElementModel
 * it reflects the same structure
 */
export interface IRuntimeElementModel extends IBaseRuntimeModel {
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
  /**
   * Return the parent element or self if no parent element exists, useful for setting expanded state when we want the parent
   */
  closestElement: IRuntimeElementModel
  descendantElements: Array<IRuntimeElementModel>
  element: Ref<IElementModel>
  /**
   * Whether the element is expanded in the tree view, moved from `ElementModel`
   */
  expanded: boolean
  mainTreeElement: IRuntimeElementModel
  parentElement: Maybe<IRuntimeElementModel>
  parentElementKey: Nullable<string>
  pathFromRoot: Array<IRuntimeElementModel>
  postRenderActionsDone: boolean
  preRenderActionsDone: boolean
  /**
   * keep track of prop key if we are rendering typedProp of type ElementType
   * to generate correct compositeKey for children too
   */
  propKey?: string
  renderChildren: ArrayOrSingle<ReactNode>
  /**
   * Runtime version of IElementModel.prop
   * serves props transformations and evaluation
   */
  runtimeProps: IRuntimeElementPropModel
  /**
   * Return if we should render element or not based on renderIfExpression
   */
  shouldRender: boolean
  style: IRuntimeElementStyleModel
  toJson: IRuntimeElementDto
  cleanupChildMapperNodes(newKeys: Array<string>): void
  runPostRenderActions(): void
  runPreRenderActions(): void
  setExpanded(expanded: boolean): void
  setPostRenderActionsDone(value: boolean): void
  setPreRenderActionsDone(value: boolean): void
}
