import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import type { IBaseRuntimeModel } from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimePageDto } from './runtime-page.dto'

/**
 * Represents runtime model for IPageModel or IComponentModel
 */
export interface IRuntimePageModel extends IBaseRuntimeModel {
  /**
   * Regular page in case the current model is a provider page
   */
  childPage?: Ref<IRuntimePageModel>
  elements: Array<IRuntimeElementModel>
  /**
   * When clicking an element from provider page while editing a regular page we should select root element of regular page
   * This is the root element of the regular page
   */
  mainTreeElement: Maybe<IRuntimeElementModel>
  /**
   * Page domain model
   */
  page: Ref<IPageModel>
  runtimeRootElement: Ref<IRuntimeElementModel>
  /**
   * Returns DTO representation of the runtime page
   */
  toJson: IRuntimePageDto
  setChildPage(childPage: Ref<IRuntimePageModel>): void
}
