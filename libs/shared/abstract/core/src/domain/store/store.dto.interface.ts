import { IAuth0ID } from '../user'
import { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  name: string
  parentStore: { id: string; key: string }
  auth0Id: IAuth0ID
  localState: string
}

export type IUpdateStoreDTO = Omit<ICreateStoreDTO, 'auth0Id'>

export type IAddStoreResourceDTO = {
  key: string
  resourceId: string
}

export type IRemoveStoreResourceDTO = {
  key: string
  resourceId: string
}

export type IStoreDTO = StoreFragment
