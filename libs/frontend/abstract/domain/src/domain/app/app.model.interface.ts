import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IApp, IAppDTO, IPropData } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IDomainModel } from '../domain'
import type { IElementModel } from '../element'
import type { IModel } from '../model.interface'
import type { IPageModel } from '../page'

/**
 * IModelData
 */

export interface IAppModel
  extends IModel<AppCreateInput, AppUpdateInput, AppDeleteInput>,
    ICacheService<IAppDTO, IAppModel>,
    IApp {
  domains: Array<Ref<IDomainModel>>
  pageRootElements: Array<Ref<IElementModel>>
  pages: Array<Ref<IPageModel>>
  /**
   * The `_app.tsx` equivalent of pages
   */
  providerPage: IPageModel
  toJson: IPropData

  page(id: string): IPageModel
}

export interface IBuilderApp {
  app: IAppModel
  page: IPageModel
}

export type IAppRef = string

export interface IAppSchema {
  app: IEntity
}
