import type { AppOptions, AppWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type { IPropData } from '../prop'
import type {
  IAppDTO,
  ICreateAppDTO,
  IPageBuilderAppProps,
  IUpdateAppDTO,
} from './app.dto.interface'
import type { IApp, IBuilderApp } from './app.model.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppDTO, IUpdateAppDTO>,
    IQueryService<IApp, AppWhere, AppOptions>,
    ICacheService<IAppDTO, IApp>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  /**
   * Properties
   */
  apps: ObjectMap<IApp>
  app(id: string): Maybe<IApp>
  appsList: Array<IApp>
  appsJson: IPropData
  load(data: IPageBuilderAppProps): IBuilderApp
  buildModal: IEntityModalService<Ref<IApp>, { app: IApp }>
  // elementService: IElementService
  // pageService: IPageService
  // storeService: IStoreService
}
