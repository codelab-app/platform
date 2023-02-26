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
  ICreateAppData,
  IPageBuilderAppProps,
  IUpdateAppData,
} from './app.dto.interface'
import type { IApp, IBuilderApp } from './app.model.interface'

export interface IAppService
  extends Omit<
      ICRUDService<IApp, ICreateAppData, IUpdateAppData>,
      'createSubmit'
    >,
    IQueryService<IApp, AppWhere, AppOptions>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  /**
   * Properties
   */
  createSubmit(appDto: ICreateAppData): Promise<IApp>
  add(appDto: IAppDTO): IApp
  apps: ObjectMap<IApp>
  app(id: string): Maybe<IApp>
  appsList: Array<IApp>
  // create(appDTO: ICreateAppDTO): IApp
  appsJson: IPropData
  load(data: IPageBuilderAppProps): IBuilderApp
  buildModal: IEntityModalService<Ref<IApp>, { app: IApp }>
}
