import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IPropData } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  apiId: string
  _api: IInterfaceType
  actions: Array<Ref<IAnyAction>>
  _storeActions: { [name: string]: { action: IAnyAction; run: any } }

  state: IPropData
  setState(initialState: IPropData): void
}

export type IStoreRef = string
