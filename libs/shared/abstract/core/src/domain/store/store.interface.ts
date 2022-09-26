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
  actions: Array<IAnyAction>
  _actionsRunners: IPropData

  state: IPropData
  _state: IPropData
  updateState(initialState: IPropData): void
}

export type IStoreRef = string
