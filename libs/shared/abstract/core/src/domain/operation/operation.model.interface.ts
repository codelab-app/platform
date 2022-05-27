import { IProp } from '../prop'
import { IGraphQLOperationConfig } from './graphql-operation-config.interface'
import { IRestOperationConfig } from './rest-operation-config.interface'

export type IOperationConfig = IProp<
  IRestOperationConfig | IGraphQLOperationConfig
>

export interface IOperation {
  id: string
  name: string
  config: IOperationConfig
  resourceId: string
  runOnInit: boolean
}
