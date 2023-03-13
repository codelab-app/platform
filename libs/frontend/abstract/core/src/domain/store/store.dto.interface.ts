import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IStoreDTO {
  actions?: Array<IEntity>
  api: IEntity
  id: string
  name: string
}

// Owner is used for interface creation
export type ICreateStoreData = IOwnerSchema & IStoreDTO

export type IUpdateStoreData = IStoreDTO
