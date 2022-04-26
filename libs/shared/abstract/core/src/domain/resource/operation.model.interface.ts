// export type IOperation = IRestOperation | IGraphQLOperation

import { IGraphQLOperationConfig } from './graphql-resource'
import { IRestOperationConfig } from './rest-resource'

export interface IOperation {
  id: string
  name: string
  config: IGraphQLOperationConfig | IRestOperationConfig
  resourceId: string
  runOnInit: boolean
}
