import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAnyAction } from '../action'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<IAnyAction>
  state: IProp
}

export type IStoreRef = string
