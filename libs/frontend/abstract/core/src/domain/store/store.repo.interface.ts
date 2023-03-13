import type { StoreWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { StoreFragment } from './store.fragment.graphql.gen'
import type { IStore } from './store.model.interface'

export type IStoreRepository = IRepository<IStore, StoreFragment, StoreWhere>
