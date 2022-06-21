import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import {
  assertIsActionKind,
  IActionKind,
  IAnyAction,
  IGraphQLActionConfig,
  IResource,
  IResourceAction,
  IResourceActionConfig,
  IResourceActionDTO,
  IRestActionConfig,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { AxiosInstance, Method } from 'axios'
import { GraphQLClient } from 'graphql-request'
import {
  _async,
  _await,
  ExtendedModel,
  model,
  modelAction,
  modelFlow,
  prop,
  Ref,
} from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createActionBase } from './action-base.model'

const hydrate = (action: IResourceActionDTO): IResourceAction => {
  assertIsActionKind(action.type, IActionKind.ResourceAction)

  return new ResourceAction({
    id: action.id,
    name: action.name,
    runOnInit: action.runOnInit,
    storeId: action.store.id,
    type: action.type,
    config: Prop.hydrate(action.config) as IResourceActionConfig,
    resource: resourceRef(action.resource.id),
    success: actionRef(action.success.id),
    error: actionRef(action.error.id),
  })
}

@model('@codelab/ResourceAction')
export class ResourceAction
  extends ExtendedModel(createActionBase(IActionKind.ResourceAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IResourceActionConfig>(),
    success: prop<Ref<IAnyAction>>(),
    error: prop<Ref<IAnyAction>>(),
  })
  implements IResourceAction
{
  static hydrate = hydrate

  @modelAction
  restFetch(client: AxiosInstance, config: IRestActionConfig) {
    return client.request({
      method: config.method as Method,
      data: config.body,
      params: config.queryParams,
    })
  }

  @modelAction
  graphqlFetch(client: GraphQLClient, config: IGraphQLActionConfig) {
    return client.request(config.query, JSON.parse(config.variables || '{}'))
  }

  @modelFlow
  runGraphql = _async(function* (this: ResourceAction) {
    try {
      const client = this.resource.current.graphqlClient
      const config = this.config.values as IGraphQLActionConfig

      yield _await(this.graphqlFetch(client, config))

      if (this.success.current) {
        this.success.current.run()
      }
    } catch (error) {
      if (this.error.current) {
        this.error.current.run()
      }
    }
  })

  @modelFlow
  runRest = _async(function* (this: ResourceAction) {
    try {
      const client = this.resource.current.restClient
      const config = this.config.values as IRestActionConfig

      yield _await(this.restFetch(client, config))

      if (this.success.current) {
        this.success.current.run()
      }
    } catch (error) {
      if (this.error.current) {
        this.error.current.run()
      }
    }
  })

  @modelAction
  run(): void {
    if (this.resource.current.type === ResourceType.GraphQL) {
      this.runGraphql()
    } else {
      this.runRest()
    }
  }
}
