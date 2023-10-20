import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IStoreRepository = IRepository<
  IStoreModel,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
