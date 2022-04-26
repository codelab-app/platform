import { StoreWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { Ref } from 'mobx-keystone'
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
  store(id: string): Maybe<IStore>
  deleteStoresSubgraph(store: IStoreRef): Promise<IStore>
  antdTree: Array<DataNode>

  addResource(store: IStore, resource: IAddStoreResourceDTO): Promise<IStore>
  removeResource(store: IStore, resource: IResourceRef): Promise<IStore>
}
