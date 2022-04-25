import { StoreFragment } from './store.fragment.graphql.gen'

export interface ICreateStoreDTO {
  name: string
  parentStore: { id: string; key: string }
  localState: string
}

export type IUpdateStoreDTO = ICreateStoreDTO

export type IAddStoreResourceDTO = {
  key: string
  resourceId: string
}

export type IRemoveStoreResourceDTO = {
  key: string
  resourceId: string
}

export type IStoreDTO = StoreFragment
