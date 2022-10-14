import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IPropData } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<Ref<IAnyAction>>
  state: IPropData
  updateState(initialState: IPropData): void
}

export type IStoreRef = string
