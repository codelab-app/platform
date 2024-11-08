import type { IApp, IAppDto, IRef } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IDomainModel } from '../domain'
import type { IPageModel } from '../page'
import type { IModel } from '../shared/models/model.interface'
import type { IUserModel } from '../user'

/**
 * IModelData
 */

export interface IAppModel extends IModel<IAppDto, IAppModel> {
  domains: Array<Ref<IDomainModel>>
  id: string
  name: string
  // owner: Ref<IUserModel>
  pages: Array<Ref<IPageModel>>
  /**
   * The `_app.tsx` equivalent of pages
   */
  providerPage: IPageModel
  slug: string
  page(id: string): IPageModel | undefined
  pageByName(name: string): IPageModel
}

export interface IAppSchema {
  app: IRef
}
