import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { IRef, IStoreDto } from '@codelab/shared/abstract/core'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface IStoreService
  extends ICrudService<IRef, IStoreDto, IStoreDto>,
    IQueryService<IStoreModel, StoreWhere, StoreOptions> {
  load(stores: Array<StoreFragment>): Array<IStoreModel>
}
