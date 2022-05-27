import { IResourceRef } from '../resource/resource.model.interface'
import { IGraphQLOperationConfig } from './graphql-operation-config.interface'
import { OperationFragment } from './operation.fragment.graphql.gen'
import { IRestOperationConfig } from './rest-operation-config.interface'

export type ICreateOperationDTO = {
  resource: IResourceRef
  name: string
  runOnInit: boolean
  config: IGraphQLOperationConfig | IRestOperationConfig
}

export type IUpdateOperationDTO = Omit<ICreateOperationDTO, 'resource'>

export type IOperationDTO = OperationFragment
