import { IGraphQLOperationConfig } from '../resource/graphql-resource'
import { IResourceRef } from '../resource/resource.model.interface'
import { IRestOperationConfig } from '../resource/rest-resource'
import { OperationFragment } from './operation.fragment.graphql.gen'

export type ICreateOperationDTO = {
  resource: IResourceRef
  name: string
  runOnInit: boolean
  config: IGraphQLOperationConfig | IRestOperationConfig
}

export type IUpdateOperationDTO = Omit<ICreateOperationDTO, 'resource'>

export type IOperationDTO = OperationFragment
