import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import { tryParse } from '@codelab/frontend/shared/utils'
import type {
  IAnyAction,
  IApiAction,
  IApiActionConfig,
  IApiActionDTO,
  IGraphQLActionConfig,
  IPropData,
  IResource,
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

const hydrate = (action: IApiActionDTO): IApiAction => {
  assertIsActionKind(action.type, IActionKind.ApiAction)

  return new ApiAction({
    id: action.id,
    name: action.name,
    storeId: action.store.id,
    type: action.type,
    config: Prop.hydrate(action.config) as IApiActionConfig,
    resource: resourceRef(action.resource.id),
    successAction: actionRef(action.successAction.id),
    errorAction: actionRef(action.errorAction.id),
  })
}

@model('@codelab/ApiAction')
export class ApiAction
  extends ExtendedModel(createBaseAction(IActionKind.ApiAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IApiActionConfig>(),
    successAction: prop<Ref<IAnyAction>>(),
    errorAction: prop<Ref<IAnyAction>>(),
  })
  implements IApiAction
{
  static hydrate = hydrate

  @modelAction
  createRunner(context: IPropData, updateState: (state: IPropData) => void) {
    const successAction = this.successAction.current
    const errorAction = this.errorAction.current
    const runPromise = this.run()

    const runner = (...args: Array<any>) =>
      runPromise
        .then((response) => {
          updateState({ [this.name]: { response } })

          if (successAction) {
            return successAction.createRunner(context, updateState)(...args)
          }

          return response
        })
        .catch((error) => {
          updateState({ [this.name]: { error } })

          if (errorAction) {
            return errorAction.createRunner(context, updateState)(...args)
          }

          return error
        })

    return runner.bind(this)
  }

  @modelAction
  writeCache(action: IApiActionDTO) {
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
