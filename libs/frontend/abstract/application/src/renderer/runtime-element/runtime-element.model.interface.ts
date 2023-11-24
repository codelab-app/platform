import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type {
  IRuntimeModel,
  IRuntimeModelRef,
} from '../runtime.model.interface'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * This model is the runtime model for IElementModel
 * it reflects the same structure
 */
export interface IRuntimeElementModel extends AnyModel {
  /**
   * The runtime model for IElementModel.closestContainerNode
   */
  closestRuntimeContainerNode: IRuntimeContainerNodeModel

  element: Ref<IElementModel>

  id: string

  /**
   * True when element is assigned as childrenContainerElement in component
   */
  isComponentInstanceChildrenContainer: boolean
  /**
   * True when element is assigned as pageContentContainer in _app page
   */
  isPageContentContainer: boolean

  /**
   * Direct parent of the element possible values runtime model for parentElement/page/component
   * We need it to traves the tree and access closestRuntimeContainerNode
   */
  parent: IRuntimeModelRef

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

  /**
   * Unlike children in IElementModel runtimeChildren
   * may come from different source other then having direct child relation
   * a good example for that is instance element children rendered inside component
   */
  sortedRuntimeChildren: Array<IRuntimeModel>

  addRuntimeChild(
    containerNode: IComponentModel | IElementModel | IPageModel,
    index?: number,
  ): IRuntimeModel
  runPostRenderAction(): void
  runPreRenderAction(): void
}
