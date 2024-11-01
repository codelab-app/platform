import type { IApp, IAppDto, IRef } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IDomainModel } from '../domain'
import type { IPageModel } from '../page'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

/**
 * IModelData
 */

export interface IAppModel
  extends IModel<IApp>,
    ICacheService<IAppDto, IAppModel> {
  domains: Array<Ref<IDomainModel>>
  name: string
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
