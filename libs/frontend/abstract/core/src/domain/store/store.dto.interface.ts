import type { IAuth0Owner } from '../user'
import type { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  id: string
  name: string
  owner: IAuth0Owner
}

export type IUpdateStoreDTO = Omit<ICreateStoreDTO, 'owner'>

export type IStoreDTO = StoreFragment
