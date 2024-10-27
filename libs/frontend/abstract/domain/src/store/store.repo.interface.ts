import type { IStoreDto } from '@codelab/shared/abstract/core'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreFragment,
  StoreOptions,
  StoreUpdateInput,
  StoreWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IStoreModel } from './store.model.interface'

export type IStoreRepository = IRepository<
  IStoreDto,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
