import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimePageModel extends AnyModel {
  /**
   * Regular page in case the current model is a provider page
   */
  childPage?: Ref<IPageModel>
  id: string
  /**
   * Page domain model
   */
  page: Ref<IPageModel>

  render: Nullable<ReactElement>
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel
}