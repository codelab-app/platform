import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import { tryParse } from '@codelab/frontend/shared/utils'
import type {
  IAnyAction,
  IGraphQLActionConfig,
  IResource,
  IResourceAction,
  IResourceActionConfig,
  IResourceActionDTO,
  IRestActionConfig,
} from '@codelab/shared/abstract/core'
import {
  assertIsActionKind,
  IActionKind,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type { AxiosInstance, Method } from 'axios'
import { GraphQLClient } from 'graphql-request'
import {
  ExtendedModel,
  model,
  modelAction,
  modelFlow,
  prop,
  Ref,
} from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createBaseAction, updateBaseAction } from './base-action.model'

const hydrate = (action: IResourceActionDTO): IResourceAction => {
  assertIsActionKind(action.type, IActionKind.ResourceAction)

  return new ResourceAction({
    id: action.id,
    name: action.name,
    storeId: action.store.id,
    type: action.type,
    config: Prop.hydrate(action.config) as IResourceActionConfig,
    resource: resourceRef(action.resource.id),
    successAction: actionRef(action.successAction.id),
    errorAction: actionRef(action.errorAction.id),
  })
}

@model('@codelab/ResourceAction')
export class ResourceAction
  extends ExtendedModel(createBaseAction(IActionKind.ResourceAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IResourceActionConfig>(),
    successAction: prop<Ref<IAnyAction>>(),
    errorAction: prop<Ref<IAnyAction>>(),
  })
  implements IResourceAction
{
  static hydrate = hydrate

  @modelAction
  writeCache(action: IResourceActionDTO) {
    updateBaseAction(this, action)

    this.resource = resourceRef(action.resource.id)
    this.config.writeCache(action.config)
    this.errorAction = actionRef(action.errorAction.id)
    this.successAction = actionRef(action.successAction.id)

    return this
  }

  @modelAction
  restFetch(client: AxiosInstance, config: IRestActionConfig) {
    const data = tryParse(config.body)
    const params = tryParse(config.queryParams)
    const headers = tryParse(config.headers)

    return client.request({
      method: config.method as Method,
      url: config.urlSegment,
      responseType: config.responseType,
      data,
      params,
      headers,
    })
  }

  @modelAction
  graphqlFetch(client: GraphQLClient, config: IGraphQLActionConfig) {
    const headers = tryParse(config.headers)
    const variables = tryParse(config.variables)

    return client.request(config.query, variables, headers)
  }

  @modelAction
  runGraphql() {
    const client = this.resource.current.graphqlClient
    const config = this.config.values as IGraphQLActionConfig

    return this.graphqlFetch(client, config)
  }

  @modelFlow
  runRest() {
    const client = this.resource.current.restClient
    const config = this.config.values as IRestActionConfig

    return this.restFetch(client, config)
  }

  @modelAction
  run() {
    return this.resource.current.type === IResourceType.GraphQL
      ? this.runGraphql()
      : this.runRest()
  }
}
