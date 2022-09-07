import { IEntity } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService, IModelCacheService } from '../../service'
import { IPage } from '../page'
import { IAppDTO } from './app.dto.interface'

export interface IApp extends IModelCacheService<IAppDTO, IApp> {
  id: IAppRef
  ownerId: string
  name: string
  slug: string
  store: IEntity
  pages: Array<Ref<IPage>>
}

export type IAppRef = string
