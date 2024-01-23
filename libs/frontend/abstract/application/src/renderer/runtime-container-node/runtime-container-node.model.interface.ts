import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

export type SubTree =
  | Ref<IComponentModel>
  | Ref<IElementModel>
  | Ref<IPageModel>

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimeContainerNodeModel extends AnyModel {
  /**
   * If runtime component is created by child mapper this sets child index
   * this could be different from the child render index if element has children
   * other than ones created by child mapper
   */
  childMapperIndex: Maybe<number>
  componentRuntimeProp?: IRuntimeComponentPropModel
  /**
   * Exposed for external use by other models and to preserve structure
   */
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id: string
  isTypedProp?: boolean

  render: Nullable<ReactElement>
  runtimeContainerNodesList: Array<IRuntimeContainerNodeModel>
  runtimeElements: ObjectMap<IRuntimeElementModel>
  runtimeElementsList: Array<IRuntimeElementModel>
  /**
   * Exposed for external use by other models and to preserve structure
   */
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel
  subTrees: Array<SubTree>

  addContainerNode(
    node: IComponentModel | IPageModel,
    runtimeParent: IRef,
    subTrees?: Array<SubTree>,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeContainerNodeModel
  addElement(node: IElementModel): IRuntimeElementModel
  setChildMapperIndex(index: number): void
}
