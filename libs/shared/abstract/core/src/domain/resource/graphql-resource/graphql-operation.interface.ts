import { AbstractOperation } from '../abstract-operation.interface'

export interface IGraphQLOperationConfig {
  query: string
  variables: string
}

export type IGraphQLOperation = AbstractOperation<IGraphQLOperationConfig>
