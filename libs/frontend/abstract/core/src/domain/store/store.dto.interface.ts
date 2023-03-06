import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IStoreDTO {
  id: string
  name: string
  actions?: Array<IEntity>
  api: IEntity
}

// Owner is used for interface creation
export type ICreateStoreData = IStoreDTO & IOwnerSchema

export type IUpdateStoreData = IStoreDTO
