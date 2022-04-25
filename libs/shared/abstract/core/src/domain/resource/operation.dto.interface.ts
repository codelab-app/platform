import { IGraphQLOperationConfig } from './graphql-resource'
import { OperationFragment } from './operation.fragment.graphql.gen'
import { IRestOperationConfig } from './rest-resource'

export type ICreateOperationDTO = {
  name: string
  runOnInit: boolean
  config: IGraphQLOperationConfig | IRestOperationConfig
}

export type IUpdateOperationDTO = ICreateOperationDTO

export type IOperationDTO = OperationFragment
