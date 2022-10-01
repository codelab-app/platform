import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IPropData } from '../prop'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  apiId: string
  actions: Array<IAnyAction>

  state: IPropData
  updateState(initialState: IPropData): void
}

export type IStoreRef = string
