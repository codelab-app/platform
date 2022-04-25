import { IPropData } from '../prop'

export interface IStore {
  name: string
  localState: IPropData
}

export interface IStoreResource {
  resourceId: string
  key: string
}
