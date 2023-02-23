import type { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  id: string
  name: string
  auth0Id: string
}

export type IUpdateStoreDTO = Omit<ICreateStoreDTO, 'id' | 'auth0Id'>

export type IStoreDTO = StoreFragment
