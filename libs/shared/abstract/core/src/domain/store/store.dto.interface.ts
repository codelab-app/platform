import { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  name: string
  parentStore: { id: string; key: string }
  initialState: string
}

export type IUpdateStoreDTO = ICreateStoreDTO

export type IStoreDTO = StoreFragment
