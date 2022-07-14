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
  IResourceType,
  IRestActionConfig,
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
import { createQueue } from '../createQueue'
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
    successAction: actionRef(action.successAction.id),
    errorAction: actionRef(action.errorAction.id),
  })
}

@model('@codelab/ResourceAction')
export class ResourceAction
  extends ExtendedModel(createActionBase(IActionKind.ResourceAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IResourceActionConfig>(),
    successAction: prop<Ref<IAnyAction>>(),
    errorAction: prop<Ref<IAnyAction>>(),
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
      const data: any = yield* _await(this.graphqlFetch(client, config))
      // eslint-disable-next-line @typescript-eslint/ban-types
      let successQueue: Array<Function> = []

      if (this.successAction.current) {
        successQueue = yield* _await(this.successAction.current.getQueue())
      }

      const setResponseCode = `this.${this.name}.response=${JSON.stringify(
        data,
      )}`

      return createQueue(setResponseCode).concat(successQueue)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      let errorQueue: Array<Function> = []

      if (this.errorAction.current) {
        errorQueue = yield* _await(this.successAction.current.getQueue())
      }

      const setErrorCode = `this.${this.name}.error=${JSON.stringify(error)}`

      return createQueue(setErrorCode).concat(errorQueue)
    }
  })

  @modelFlow
  runRest = _async(function* (this: ResourceAction) {
    try {
      const client = this.resource.current.restClient
      const config = this.config.values as IRestActionConfig
      const data = yield _await(this.restFetch(client, config))
      // eslint-disable-next-line @typescript-eslint/ban-types
      let successQueue: Array<Function> = []

      if (this.successAction.current) {
        successQueue = yield* _await(this.successAction.current.getQueue())
      }

      const setResponseCode = `this.${this.name}.response=${JSON.stringify(
        data,
      )}`

      return createQueue(setResponseCode).concat(successQueue)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      let errorQueue: Array<Function> = []

      if (this.errorAction.current) {
        errorQueue = yield* _await(this.errorAction.current.getQueue())
      }

      const setErrorCode = `this.${this.name}.error=${JSON.stringify(error)}`

      return createQueue(setErrorCode).concat(errorQueue)
    }
  })

  @modelAction
  getQueue() {
    // eslint-disable-next-line no-new-func
    return this.resource.current.type === IResourceType.GraphQL
      ? this.runGraphql()
      : this.runRest()
  }
}
