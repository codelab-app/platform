import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IProp } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  state: IProp
  getByExpression: (key: string) => unknown
}

export type IStoreRef = string
