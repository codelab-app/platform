import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IProp } from '../prop'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  stateApiId: string
  state: IProp
  actions: Array<Ref<IAnyAction>>
  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
