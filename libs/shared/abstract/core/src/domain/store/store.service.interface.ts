import { StoreWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { ICreateStoreDTO, IUpdateStoreDTO } from './store.dto.interface'
import { IStore } from './store.interface'

export interface IStoreService
  extends ICRUDService<IStore, ICreateStoreDTO, IUpdateStoreDTO>,
    IQueryService<IStore, StoreWhere>,
    ICRUDModalService<Ref<IStore>, { store: Maybe<IStore> }> {
  stores: ObjectMap<IStore>
  storesList: Array<IStore>
  store(id: string): Maybe<IStore>
}
