import {
  IAnyAction,
  IApiAction,
  IApiActionConfig,
  IApiActionDTO,
  IGraphQLActionConfig,
  IProp,
  IResource,
  IRestActionConfig,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { resourceRef } from '@codelab/frontend/domain/resource'
import { tryParse } from '@codelab/frontend/shared/utils'
import {
  assertIsActionKind,
  IActionKind,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import axios, { Axios, Method } from 'axios'
import { GraphQLClient } from 'graphql-request'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createBaseAction, updateBaseAction } from './base-action.model'
import { storeRef } from './store.model'

const hydrate = (action: IApiActionDTO): IApiAction => {
  assertIsActionKind(action.type, IActionKind.ApiAction)

  return new ApiAction({
    id: action.id,
    name: action.name,
    store: storeRef(action.store.id),
    type: action.type,
    // TODO: fix up type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: Prop.hydrate(action.config) as any,
    resource: resourceRef(action.resource.id),
    successAction: action.successAction
      ? actionRef(action.successAction.id)
      : null,
    errorAction: action.errorAction ? actionRef(action.errorAction.id) : null,
  })
}

const restFetch = (client: Axios, config: IRestActionConfig) => {
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

const graphqlFetch = (client: GraphQLClient, config: IGraphQLActionConfig) => {
  const headers = tryParse(config.headers)
  const variables = tryParse(config.variables)

  return client.request(config.query, variables, headers)
}

@model('@codelab/ApiAction')
export class ApiAction
  extends ExtendedModel(createBaseAction(IActionKind.ApiAction), {
    resource: prop<Ref<IResource>>(),
    config: prop<IApiActionConfig>(),
    successAction: prop<Nullish<Ref<IAnyAction>>>(),
    errorAction: prop<Nullish<Ref<IAnyAction>>>(),
  })
  implements IApiAction
{
  static hydrate = hydrate

  @modelAction
  private replaceStateInConfig(config: IProp) {
    return this.store.current.replaceStateInProps(config.values)
  }

  @computed
  get _resourceConfig() {
    return this.replaceStateInConfig(this.resource.current.config)
  }

  @computed
  get _graphqlClient() {
    const { headers, url } = this._resourceConfig
    const options = { headers: tryParse(headers) }

    return new GraphQLClient(url, options)
  }

  @computed
  get _restClient() {
    const { headers, url } = this._resourceConfig

    return axios.create({ baseURL: url, headers: tryParse(headers) })
  }

  @modelAction
  createRunner(state: IProp) {
    const successAction = this.successAction?.current
    const errorAction = this.errorAction?.current
    const resource = this.resource.current
    const config = this.store.current.replaceStateInProps(this.config.values)

    const runner = (...args: Array<unknown>) => {
      const conf = merge(config, args[0])

      const fetchPromise =
        resource.type === IResourceType.GraphQL
          ? graphqlFetch(this._graphqlClient, conf as IGraphQLActionConfig)
          : restFetch(this._restClient, conf as IRestActionConfig)

      fetchPromise
        .then((response) => {
          state.set(this.name, { response })

          return successAction?.createRunner(state)(...args)
        })
        .catch((error) => {
          state.set(this.name, { error: JSON.stringify(error) })

          return errorAction?.createRunner(state)(...args)
        })
    }

    return runner.bind(this)
  }

  @modelAction
  writeCache(action: IApiActionDTO) {
    updateBaseAction(this, action)

    this.resource = resourceRef(action.resource.id)
    this.config.writeCache(action.config)
    this.errorAction = action.errorAction
      ? actionRef(action.errorAction.id)
      : null
    this.successAction = action.successAction
      ? actionRef(action.successAction.id)
      : null
    this.store = storeRef(action.store.id)

    return this
  }
}
