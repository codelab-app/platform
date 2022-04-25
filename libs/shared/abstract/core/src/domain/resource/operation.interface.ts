import { IGraphQLOperation } from './graphql-resource'
import { IRestOperation } from './rest-resource'

export type IOperation = IRestOperation | IGraphQLOperation
