import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'
import type { IRuntimeContainerNodeModel } from '../runtime-container-node'
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
  children: Array<Ref<IRuntimeContainerNodeModel> | Ref<IRuntimeElementModel>>
  /**
   * The runtime model for IElementModel.closestContainerNode
   */
  closestContainerNode: Ref<IRuntimeContainerNodeModel>

  element: Ref<IElementModel>

  id: string

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

  runPostRenderAction(): void
  runPreRenderAction(): void
}
