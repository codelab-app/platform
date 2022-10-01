import { AppWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import {
  IAppDTO,
  ICreateAppDTO,
  IPageBuilderAppProps,
  IUpdateAppDTO,
} from './app.dto.interface'
import { IApp, IBuilderApp } from './app.model.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppDTO, IUpdateAppDTO>,
    IQueryService<IApp, AppWhere>,
    ICacheService<IAppDTO, IApp>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  /**
   * Properties
   */
  apps: ObjectMap<IApp>
  app(id: string): Maybe<IApp>
  appsList: Array<IApp>
  load(data: IPageBuilderAppProps): IBuilderApp
}
