import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IApp } from '../app'
import { IProp, IPropData } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<IAnyAction>
  _state: IProp
  state: IPropData
  initState(apps: Array<IApp>): void
  getState(value: string): unknown
}

export type IStoreRef = string
