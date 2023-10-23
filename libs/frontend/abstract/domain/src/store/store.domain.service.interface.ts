import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IStoreModel } from './store.model.interface'

export interface IStoreDomainService {
  stores: ObjectMap<IStoreModel>
  storesList: Array<IStoreModel>

  hydrate(storeDTO: IStoreDTO): IStoreModel
}
