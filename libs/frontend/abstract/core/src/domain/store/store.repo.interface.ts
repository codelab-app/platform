import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IStoreModel } from './store.model.interface'

export type IStoreRepository = IRepository<
  IStoreModel,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
