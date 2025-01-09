import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import type { IBaseRuntimeModel } from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimePageModel extends IBaseRuntimeModel {
  /**
   * Regular page in case the current model is a provider page
   */
  childPage?: Ref<IRuntimePageModel>
  /**
   * Page domain model
   */
  page: Ref<IPageModel>
  runtimeRootElement: IRuntimeElementModel
}
