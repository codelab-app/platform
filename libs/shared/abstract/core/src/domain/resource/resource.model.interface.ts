import { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'
import { IProp } from '../prop'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

export enum IResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',

  MySql = 'MySql',
  PostgreSql = 'PostgreSql',
  SqlServer = 'SqlServer',
  Oracle = 'Oracle',
  MongoDB = 'MongoDB',
}

export type IResourceConfig = IProp<
  IGraphQLResourceConfig | IRestResourceConfig
>

export interface IResource {
  id: string
  name: string
  config: IResourceConfig
  type: ResourceType

  graphqlClient: GraphQLClient

  restClient: AxiosInstance
}

export type IResourceRef = string
