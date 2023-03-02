import type { IEntity } from '@codelab/shared/abstract/types'
import type { IActionDTO } from '../action'
import type { IInterfaceTypeDTO } from '../type'
import type { IAuth0Owner, IOwnerSchema } from '../user'
import type { StoreFragment } from './store.fragment.graphql.gen'

export interface IStoreDTO {
  id: string
  name: string
  actions?: Array<IActionDTO>
  api: IEntity
}

// Owner is used for interface creation
export type ICreateStoreData = IStoreDTO & IOwnerSchema

export type IUpdateStoreData = IStoreDTO
