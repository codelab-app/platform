import { IAuth0Id } from '../user'
import { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  id: string
  name: string
  auth0Id: IAuth0Id
  state: string
}

export type IUpdateStoreDTO = Omit<ICreateStoreDTO, 'id' | 'auth0Id'>

export type IStoreDTO = StoreFragment
