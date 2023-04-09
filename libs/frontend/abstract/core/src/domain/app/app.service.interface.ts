import type {
  AppOptions,
  AppWhere,
  GetRenderedPageAndCommonAppDataQuery,
} from '@codelab/shared/abstract/codegen'
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
  IAppDTO,
  ICreateAppData,
  IPageBuilderAppProps,
  IUpdateAppData,
} from './app.dto.interface'
import type { IApp } from './app.model.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppData, IUpdateAppData>,
    IQueryService<IApp, AppWhere, AppOptions>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  apps: ObjectMap<IApp>
  appsJson: IPropData
  appsList: Array<IApp>
  buildModal: IEntityModalService<Ref<IApp>, { app: IApp }>

  add(appDto: IAppDTO): IApp
  app(id: string): Maybe<IApp>
  getRenderedPageAndCommonAppData(
    appId: string,
    pageId: string,
    initialData?: GetRenderedPageAndCommonAppDataQuery,
  ): Promise<IApp | undefined>
  lazyGetRemainingPages(appId: string): Promise<void>
  loadAppsWithNestedPreviews(where: AppWhere): Promise<Array<IApp>>
  loadPages(data: IPageBuilderAppProps): void
}
