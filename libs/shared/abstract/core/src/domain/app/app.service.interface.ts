import { AppWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { ICreateAppDTO, IUpdateAppDTO } from './app.dto.interface'
import { IApp } from './app.interface'

export interface IAppService
  extends ICRUDService<IApp, ICreateAppDTO, IUpdateAppDTO>,
    IQueryService<IApp, AppWhere>,
    ICRUDModalService<Ref<IApp>> {
  /**
   * Properties
   */
  apps: ObjectMap<IApp>
  app(id: string): Maybe<IApp>
  appsList: Array<IApp>

  /**
   * Query
   */
  // getOne(id: string): Promise<Maybe<IApp>>
  // getAll(where?: AppWhere): Promise<Array<IApp>>

  /**
   * Mutation
   */
  // create(data: ICreateAppDTO, ownerId: string): Promise<IApp>
  // update(existing: IApp, data: IUpdateAppDTO): Promise<IApp>
  // delete(id: string): Promise<IApp>
}
