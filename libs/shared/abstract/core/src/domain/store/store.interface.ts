import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IPropData } from '../prop'
import { IInterfaceType } from '../type'

export interface IStore {
  id: string
  name: string
  parentStore: Nullish<Ref<IStore>>
  storeKey: Nullable<string>
  state: Ref<IInterfaceType>
  localState: IPropData
  toMobxObservable(): any
}

export type IStoreRef = string

export interface IStoreResource {
  resourceId: string
  key: string
}
