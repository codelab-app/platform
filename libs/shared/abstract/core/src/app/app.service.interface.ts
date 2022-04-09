import { AppWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { ICreateAppDTO, IUpdateAppDTO } from './app.dto.interface'
import { IApp } from './app.interface'

export interface IAppService {
  /**
   * Properties
   */
  apps: ObjectMap<IApp>
  app(id: string): Maybe<IApp>
  appsList: Array<IApp>

  /**
   * Query
   */
  getOne(id: string): Promise<Maybe<IApp>>
  getAll(where?: AppWhere): Promise<Array<IApp>>

  /**
   * Mutation
   */
  create(data: ICreateAppDTO, ownerId: string): Promise<IApp>
  update(existing: IApp, data: IUpdateAppDTO): Promise<IApp>
  delete(id: string): Promise<IApp>
}
