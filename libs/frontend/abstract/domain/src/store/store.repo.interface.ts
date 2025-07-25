import type { IStoreDto } from '@codelab/shared-abstract-core'
import type {
  StoreFragment,
  StoreOptions,
  StoreWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IStoreRepository = IRepository<
  IStoreDto,
  StoreFragment,
  StoreWhere,
  StoreOptions
>
