import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IAnyAction } from '../action'
import { IProp, IPropData } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<IAnyAction>
  state: IProp
  getByExpression: (key: string) => unknown
  replaceStateInProps: (props: IPropData) => IPropData
}

export type IStoreRef = string
