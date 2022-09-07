import { Ref } from 'mobx-keystone'
import { IAnyAction } from '../action'
import { IProp } from '../prop'
import { IStoreDTO } from './store.dto.interface'

export interface IStore {
  id: string
  name: string
  stateApiId: string
  state: IProp
  actions: Array<Ref<IAnyAction>>
  writeCache(data: IStoreDTO): IStore
  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
