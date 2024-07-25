import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ICRUDService, IQueryService } from '../services'

export interface IStoreService
  extends ICRUDService<IStoreModel, IStoreDto, IStoreDto>,
    IQueryService<IStoreModel, StoreWhere, StoreOptions> {
  load(stores: Array<StoreFragment>): Array<IStoreModel>
  store(id: string): Maybe<IStoreModel>
}
