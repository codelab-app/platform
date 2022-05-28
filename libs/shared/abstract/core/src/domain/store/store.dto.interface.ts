import { IAuth0Id } from '../user'
import { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  name: string
  parentStore: { id: string; key: string }
  auth0Id: IAuth0Id
  state: string
}

export type IUpdateStoreDTO = Omit<ICreateStoreDTO, 'auth0Id'>

export type IStoreDTO = StoreFragment
