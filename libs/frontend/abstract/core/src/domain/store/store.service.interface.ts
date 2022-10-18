import { StoreOptions, StoreWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import {
  ICreateStoreDTO,
  IStoreDTO,
  IUpdateStoreDTO,
} from './store.dto.interface'
import { IStore } from './store.model.interface'

export interface IStoreService
  extends ICRUDService<IStore, ICreateStoreDTO, IUpdateStoreDTO>,
    IQueryService<IStore, StoreWhere, StoreOptions>,
    ICacheService<IStoreDTO, IStore>,
    ICRUDModalService<Ref<IStore>, { store: Maybe<IStore> }> {
  stores: ObjectMap<IStore>
  storesList: Array<IStore>
  store(id: string): Maybe<IStore>
  // typeService: ITypeService
}
