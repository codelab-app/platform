import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type {
  IRuntimeModel,
  IRuntimeModelRef,
} from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimeContainerNodeModel extends AnyModel {
  /**
   * We creating using containerNodeRef then access containerNode via computed values
   */
  containerNode: IComponentModel | IPageModel
  containerNodeRef: Ref<IComponentModel> | Ref<IPageModel>
  id: string

  parent?: IRuntimeModel
  parentRef?: IRuntimeModelRef

  render: Nullable<ReactElement>
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel
}
