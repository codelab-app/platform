import { StoreWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { IResourceRef } from '../resource'
import {
  IAddStoreResourceDTO,
  ICreateStoreDTO,
  IUpdateStoreDTO,
} from './store.dto.interface'
import { IStore, IStoreRef } from './store.interface'

export interface IStoreService
  extends Omit<
      ICRUDService<IStore, ICreateStoreDTO, IUpdateStoreDTO>,
      'delete'
    >,
    IQueryService<IStore, StoreWhere>,
    ICRUDModalService<Ref<IStore>, { store: Maybe<IStore> }> {
  stores: ObjectMap<IStore>
  roots: Array<IStore>
  store(id: string): Maybe<IStore>
  deleteStoresSubgraph(store: IStoreRef): Promise<IStore>
  /**
   * Get all descendant store
   */
  getTree(root: IStoreRef): Promise<Array<IStore>>

  addResource(store: IStore, resource: IAddStoreResourceDTO): Promise<IStore>
  removeResource(store: IStore, resource: IResourceRef): Promise<IStore>
}
