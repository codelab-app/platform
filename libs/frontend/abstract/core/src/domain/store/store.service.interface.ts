import type { StoreOptions, StoreWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IAppDTO } from '../app'
import type { IStoreDTO, IUpdateStoreData } from './store.dto.interface'
import type { IStore } from './store.model.interface'

export interface IStoreService
  extends ICRUDService<IStore, IStoreDTO, IUpdateStoreData>,
    IQueryService<IStore, StoreWhere, StoreOptions>,
    ICacheService<IStoreDTO, IStore>,
    ICRUDModalService<Ref<IStore>, { store: Maybe<IStore> }> {
  stores: ObjectMap<IStore>
  store(id: string): Maybe<IStore>
  add(appDTO: Pick<IAppDTO, 'id' | 'name'>): IStore
  add(storeDTO: IStoreDTO): IStore
}
