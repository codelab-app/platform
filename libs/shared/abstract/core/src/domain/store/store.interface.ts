import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  apiId: string
  actions: Array<Ref<IAnyAction>>
  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
