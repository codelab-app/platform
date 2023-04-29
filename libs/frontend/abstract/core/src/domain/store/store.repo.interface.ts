import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IStore } from './store.model.interface'

export type IStoreRepository = IRepository<
  IStore,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
