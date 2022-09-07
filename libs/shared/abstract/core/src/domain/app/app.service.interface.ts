import { AppWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import {
  IBuilderApp,
  ICreateAppDTO,
  IPageBuilderAppProps,
  IUpdateAppDTO,
} from './app.dto.interface'
import { IApp } from './app.model.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppDTO, IUpdateAppDTO>,
    IQueryService<IApp, AppWhere>,
    ICRUDModalService<Ref<IApp>, { app: Maybe<IApp> }> {
  /**
   * Properties
   */
  apps: ObjectMap<IApp>
  app(id: string): IApp
  appsList: Array<IApp>
  load(data: IPageBuilderAppProps): IBuilderApp
}
