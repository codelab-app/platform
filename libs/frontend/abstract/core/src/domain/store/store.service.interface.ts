import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IStoreModel } from './store.model.interface'
import type { IStoreRepository } from './store.repo.interface'

export interface IStoreService
  extends ICRUDService<IStoreModel, IStoreDTO, IStoreDTO>,
    IQueryService<IStoreModel, StoreWhere, StoreOptions>,
    ICRUDModalService<Ref<IStoreModel>, { store: Maybe<IStoreModel> }> {
  storeRepository: IStoreRepository
  stores: ObjectMap<IStoreModel>
  storesList: Array<IStoreModel>

  add(storeDTO: IStoreDTO): IStoreModel
  load(stores: Array<StoreFragment>): Array<IStoreModel>
  store(id: string): Maybe<IStoreModel>
}
