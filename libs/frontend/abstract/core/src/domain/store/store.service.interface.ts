import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IStoreDTO, IUpdateStoreData } from './store.dto.interface'
import type { IStore } from './store.model.interface'
import type { IStoreRepository } from './store.repo.interface'

export interface IStoreService
  extends ICRUDService<IStore, IStoreDTO, IUpdateStoreData>,
    IQueryService<IStore, StoreWhere, StoreOptions>,
    ICRUDModalService<Ref<IStore>, { store: Maybe<IStore> }> {
  clonedStores: ObjectMap<IStore>
  storeRepository: IStoreRepository
  stores: ObjectMap<IStore>

  add(storeDTO: IStoreDTO): IStore
  load(stores: Array<StoreFragment>): Array<IStore>
  store(id: string): Maybe<IStore>
}
