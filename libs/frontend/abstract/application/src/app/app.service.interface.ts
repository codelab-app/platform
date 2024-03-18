import type {
  IAppDevelopmentService,
  IAppDomainService,
  IAppModel,
  IAppProductionService,
  ICreateAppData,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import type { AppOptions, AppWhere } from '@codelab/shared/abstract/codegen'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../services'
import type { IAppRepository } from '.'

export interface IAppService
  extends ICRUDService<IAppModel, ICreateAppData, IUpdateAppData>,
    IQueryService<IAppModel, AppWhere, AppOptions>,
    ICRUDModalService<Ref<IAppModel>, { app?: IAppModel }> {
  appDevelopmentService: IAppDevelopmentService
  appDomainService: IAppDomainService
  appProductionService: IAppProductionService
  appRepository: IAppRepository
  buildModal: IEntityModalService<Ref<IAppModel>, { app?: IAppModel }>

  getSelectAppOptions(): Promise<Array<DefaultOptionType>>
  loadAppsPreview(where: AppWhere): Promise<Array<IAppModel>>
  regeneratePages(app: IAppModel, pagesUrls?: Array<string>): Promise<void>
  updatePage(data: IUpdatePageData): Promise<void>
}
