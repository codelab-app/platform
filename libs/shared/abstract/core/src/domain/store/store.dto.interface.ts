import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IActionExport } from '../action'
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

export type IStoreExport = Omit<OGM_TYPES.Store, 'actions'> & {
  actions: Array<IActionExport>
}
