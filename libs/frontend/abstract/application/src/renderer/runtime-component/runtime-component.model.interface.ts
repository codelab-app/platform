import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IElementTreeViewDataNode } from '../../builder'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * Represents runtime model IComponentModel
 */
export interface IRuntimeComponentModel extends AnyModel {
  /**
   * If runtime component is created by child mapper this sets child index
   * this could be different from the child render index if element has children
   * other than ones created by child mapper
   */
  childMapperIndex: Maybe<number>
  /**
   * Children of the instance element which will be added as componentProp.children prop
   */
  children: Array<IRuntimeElementModel>
  /**
   * Exposed for external use by other models and to preserve structure
   */
  component: Ref<IComponentModel>
  compositeKey: string
  isChildMapperComponentInstance: boolean
  isTypedProp?: boolean
  render: Nullable<ReactElement>
  /**
   * Exposed for external use by other models and to preserve structure
   */
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeProps: IRuntimeComponentPropModel
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel
  treeViewNode: IElementTreeViewDataNode
  setChildMapperIndex(index: number): void
}
