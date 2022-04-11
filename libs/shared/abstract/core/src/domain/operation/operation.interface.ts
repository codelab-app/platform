import { IResource } from '../resource'

export interface IOperation {
  /**
   * Each operation will use a resource type
   */
  resource: IResource
  /**
   * These are the operation options, conditional on IResource.type
   */
  options: IRESTOperation | IGraphQLOperation
  /**
   * Stores the data for `options` configuration
   */
  config: JSON
}

export interface IRESTOperation {
  actionType: 'GET' | 'POST'
  queryParams: JSON
  body: any
  headers: JSON
}

export interface IGraphQLOperation {
  query: string
  variables: JSON
  headers: JSON
}
