import { IGraphQLOperationConfig } from './graphql-resource'
import { OperationFragment } from './operation.fragment.graphql.gen'
import { IResourceRef } from './resource.model.interface'
import { IRestOperationConfig } from './rest-resource'

export type ICreateOperationDTO = {
  resource: IResourceRef
  name: string
  runOnInit: boolean
  config: IGraphQLOperationConfig | IRestOperationConfig
}

export type IUpdateOperationDTO = Omit<ICreateOperationDTO, 'resource'>

export type IOperationDTO = OperationFragment
