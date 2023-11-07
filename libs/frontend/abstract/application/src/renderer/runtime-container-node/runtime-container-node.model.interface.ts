import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type {
  IRuntimeModel,
  IRuntimeModelRef,
} from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimePropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimeContainerNodeModel extends AnyModel {
  /**
   * If runtime component is created by child mapper this sets child index
   */
  childMapperIndex: Maybe<number>
  /**
   * Exposed for external use by other models and to preserve structure
   */
  containerNode: IComponentModel | IPageModel
  id: string
  /**
   * Exposed for external use by other models and to preserve structure
   */
  parent?: IRuntimeModel
  parentRef?: IRuntimeModelRef

  render: Nullable<ReactElement>
  // runtimeProps is available when containerNode is component
  runtimeProps?: IRuntimePropModel
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel

  setChildMapperIndex(index: number): void
}
