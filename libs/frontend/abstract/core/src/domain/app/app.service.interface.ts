import type {
  AppOptions,
  AppWhere,
  GetRenderedPageAndCommonAppDataQuery,
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
import type {
  ICreateAppData,
  IPageBuilderAppProps,
  IUpdateAppData,
} from './app.dto.interface'
import type { IApp } from './app.model.interface'
import type { IAppRepository } from './app.repo.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppData, IUpdateAppData>,
    IQueryService<IApp, AppWhere, AppOptions>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  appRepository: IAppRepository
  apps: ObjectMap<IApp>
  appsJson: IPropData
  appsList: Array<IApp>
  buildModal: IEntityModalService<Ref<IApp>, { app: IApp }>

  add(appDto: IAppDTO): IApp
  app(id: string): Maybe<IApp>
  getAppPages(appId: string, where: PageWhere): Promise<void>
  getRenderedPageAndCommonAppData(
    appId: string,
    pageName: string,
    initialData?: GetRenderedPageAndCommonAppDataQuery,
  ): Promise<IApp | undefined>
  loadAppsWithNestedPreviews(where: AppWhere): Promise<Array<IApp>>
  loadPages(data: IPageBuilderAppProps): void
}
