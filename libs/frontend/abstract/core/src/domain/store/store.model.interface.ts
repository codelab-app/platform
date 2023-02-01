import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAnyAction } from '../action'
import type { IProp, IPropData } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<IAnyAction>
  state: IProp
  getByExpression: (key: string) => unknown
  evaluateExpression: (key: string) => unknown
  replaceStateInProps: (props: IPropData, context: IPropData) => IPropData
}

export type IStoreRef = string
