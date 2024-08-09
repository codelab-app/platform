import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IApp, IAppDto, IRef } from '@codelab/shared/abstract/core'
import type { IDomainModel } from '../domain'
import type { IPageModel } from '../page'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

/**
 * IModelData
 */

export interface IAppModel
  extends IModel<AppCreateInput, AppUpdateInput, AppDeleteInput, IApp>,
    ICacheService<IAppDto, IAppModel> {
  domains: Array<IDomainModel>
  name: string
  // pageRootElements: Array<Ref<IElementModel>>
  pages: Array<IPageModel>
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
