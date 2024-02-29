import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRuntimeComponentModel } from '../runtime-component'
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
  /**
   * The element this page is attached to it will be : ProviderPage.pageContentContainer
   */
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeRootElement: IRuntimeElementModel
  runtimeStore: IRuntimeStoreModel

  addComponent(
    node: IComponentModel,
    runtimeParent: IRef,
    children?: Array<Ref<IElementModel>>,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel

  addElement(element: IElementModel): IRuntimeElementModel

  /**
   * add runtime root element for the current page
   */
  addRuntimeRootElement(node: IElementModel): IRuntimeElementModel
}
