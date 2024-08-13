import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/infra/gql'
import type { IRepository } from '../shared'
import type { IStoreModel } from './store.model.interface'

export type IStoreRepository = IRepository<
  IStoreModel,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
