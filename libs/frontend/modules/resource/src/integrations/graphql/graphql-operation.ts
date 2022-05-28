import { IGraphQLActionConfig, IPropData } from '@codelab/shared/abstract/core'
import { BaseOperation } from '../base-operation'
import { GraphQLResource } from './graphql-resource'

export class GraphQlOperation extends BaseOperation<
  GraphQLResource,
  IGraphQLActionConfig,
  IPropData
> {
  fetch(): Promise<IPropData> {
    const { query, variables } = this._config

    return this._resource
      .getInstance()
      .request(query, JSON.parse(variables || '{}'))
  }
}
