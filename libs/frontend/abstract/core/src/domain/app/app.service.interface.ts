import type {
  AppOptions,
  AppWhere,
  GetProductionPageQuery,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type { IPropData } from '../prop'
import type { ICreateAppData, IUpdateAppData } from './app.dto.interface'
import type { IAppModel } from './app.model.interface'
import type { IAppRepository } from './app.repo.interface'
import type { IAppDevelopmentService } from './app-development.service.interface'

export interface IAppService
  extends ICRUDService<IAppModel, ICreateAppData, IUpdateAppData>,
    IQueryService<IAppModel, AppWhere, AppOptions>,
    ICRUDModalService<Ref<IAppModel>, { app: Maybe<IAppModel> }> {
  appDevelopmentService: IAppDevelopmentService
  appRepository: IAppRepository
  apps: ObjectMap<IAppModel>
  appsJson: IPropData
  appsList: Array<IAppModel>
  buildModal: IEntityModalService<Ref<IAppModel>, { app: IAppModel }>

  add(appDto: IAppDTO): IAppModel
  app(id: string): Maybe<IAppModel>
  getAppPages(appId: string, where: PageWhere): Promise<void>
  loadAppsPreview(where: AppWhere): Promise<Array<IAppModel>>
  // loadDevelopmentApp(where: AppUniqueWhere): Promise<IAppModel>
  // loadDevelopmentPage(
  //   appName: string,
  //   pageName: string,
  // ): Promise<IAppModel | null>
  // loadPages(data: IAppDevelopmentDto): void
  loadProductionPage(initialData: GetProductionPageQuery): IAppModel | undefined
}
