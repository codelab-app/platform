import { IResourceRef } from '../resource'
import { ActionFragment } from './action.fragment.graphql.gen'

export interface ICreateActionDTO {
  storeId: string
  name: string
  body: string

  runOnInit: boolean
  resource: IResourceRef
  config: IGraphQLOperationConfig | IRestOperationConfig
}

export type IUpdateActionDTO = Omit<ICreateActionDTO, 'storeId'>

export type IActionDTO = ActionFragment
