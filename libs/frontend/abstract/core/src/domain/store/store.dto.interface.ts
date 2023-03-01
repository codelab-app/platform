import type { IEntity } from '@codelab/shared/abstract/types'
import type { IActionDTO } from '../action'
import type { IInterfaceTypeDTO } from '../type'
import type { IAuth0Owner } from '../user'
import type { StoreFragment } from './store.fragment.graphql.gen'

export interface IStoreDTO {
  id: string
  name: string
  actions?: Array<IActionDTO>
  api: IEntity
}

export type ICreateStoreData = IStoreDTO & {
  owner: IAuth0Owner
}

export type IUpdateStoreData = Omit<IStoreDTO, 'owner'>
