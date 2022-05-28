import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { INodeType, STORE_NODE_TYPE } from '../../base/node.interface'
import { IBuilderDataNode } from '../../ui'
import { IPropData as IProp } from '../prop'
import { IInterfaceType } from '../type'
import { IStoreDTO } from './store.dto.interface'

export interface IStore extends INodeType<STORE_NODE_TYPE> {
  id: string
  name: string
  parentStore: Nullish<Ref<IStore>>
  storeKey: Nullable<string>
  stateApi: Ref<IInterfaceType>
  state: IProp
  children: ObjectMap<Ref<IStore>>
  childrenList: Array<IStore>
  antdNode: IBuilderDataNode
  isRoot: boolean
  updateCache(data: Omit<IStoreDTO, '__typename'>): IStore

  toMobxObservable(globals?: any): any
}

export type IStoreRef = string
