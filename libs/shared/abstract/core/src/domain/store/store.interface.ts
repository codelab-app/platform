import { IProp } from '../prop'
import { IStoreDTO } from './store.dto.interface'

export interface IStore {
  id: string
  name: string
  stateApiId: string
  state: IProp
  updateCache(data: Omit<IStoreDTO, '__typename'>): IStore
  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
