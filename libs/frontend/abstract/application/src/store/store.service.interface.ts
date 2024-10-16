import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { IStoreDto } from '@codelab/shared/abstract/core'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/infra/gql'

import type { ICRUDService, IQueryService } from '../services'

export interface IStoreService
  extends ICRUDService<IStoreModel, IStoreDto, IStoreDto>,
    IQueryService<IStoreModel, StoreWhere, StoreOptions> {
  load(stores: Array<StoreFragment>): Array<IStoreModel>
}
