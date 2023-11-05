import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IStoreModel } from './store.model.interface'

export interface IStoreDomainService
  extends IHydrateable<IStoreDTO, IStoreModel> {
  stores: ObjectMap<IStoreModel>
  storesList: Array<IStoreModel>
}
