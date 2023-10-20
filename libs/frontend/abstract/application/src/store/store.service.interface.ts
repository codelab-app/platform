import type {
  IStoreDomainService,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../services'
import type { IStoreRepository } from './store.repo.interface'

export interface IStoreService
  extends ICRUDService<IStoreModel, IStoreDTO, IStoreDTO>,
    IQueryService<IStoreModel, StoreWhere, StoreOptions>,
    ICRUDModalService<IStoreModel, { store?: IStoreModel }> {
  storeDomainService: IStoreDomainService
  storeRepository: IStoreRepository

  load(stores: Array<StoreFragment>): Array<IStoreModel>
  store(id: string): Maybe<IStoreModel>
}
