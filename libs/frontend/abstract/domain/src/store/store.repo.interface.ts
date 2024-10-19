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
  StoreCreateInput,
  StoreUpdateInput,
  StoreDeleteInput,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
