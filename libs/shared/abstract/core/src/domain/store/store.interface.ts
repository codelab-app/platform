import { Ref } from 'mobx-keystone'
import { IPropData as IProp } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore {
  id: string
  name: string
  stateApi: Ref<IInterfaceType>
  state: IProp
  updateCache(data: Omit<IStoreDTO, '__typename'>): IStore
  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
