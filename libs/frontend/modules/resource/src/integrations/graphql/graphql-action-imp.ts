import { IGraphQLActionConfig, IPropData } from '@codelab/shared/abstract/core'
import { ActionBaseImp } from '../base-action-imp'
import { GraphQLResourceImp } from './graphql-resource-imp'

export class GraphQlActionImp extends ActionBaseImp<
  GraphQLResourceImp,
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
