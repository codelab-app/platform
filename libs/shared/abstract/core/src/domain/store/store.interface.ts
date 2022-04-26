import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { TableProps as RcTableProps } from 'rc-table/lib/Table'
import { IPropData } from '../prop'
import { IResource } from '../resource'
import { IInterfaceType } from '../type'

export interface IStore {
  id: string
  name: string
  parentStore: Nullish<Ref<IStore>>
  storeKey: Nullable<string>
  state: Ref<IInterfaceType>
  localState: IPropData
  resourcesList: RcTableProps<Omit<IResource, 'operations'>>['data']
  toMobxObservable(): any
}

export type IStoreRef = string

export interface IStoreResource {
  resourceId: string
  key: string
}
