import type {
  IAnyAction,
  IApiAction,
  IApiActionConfig,
  IGraphQLActionConfig,
  IPropData,
  IResource,
  IRestActionConfig,
} from '@codelab/frontend/abstract/core'
import { IApiActionDTO, IProp } from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { resourceRef } from '@codelab/frontend/domain/resource'
import { replaceStateInProps, tryParse } from '@codelab/frontend/shared/utils'
import {
  assertIsActionKind,
  IActionKind,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
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

const restFetch = (
  client: Axios,
  config: IRestActionConfig,
  overrideConfig?: IPropData,
) => {
  const data = merge(tryParse(config.body), overrideConfig?.body)
  const headers = merge(tryParse(config.headers), overrideConfig?.headers)

  const params = merge(
    tryParse(config.queryParams),
    overrideConfig?.queryParams,
  )

  return client.request({
    method: config.method as Method,
    url: config.urlSegment,
    responseType: config.responseType,
    data,
    params,
    headers,
  })
}

const graphqlFetch = (
  client: GraphQLClient,
  config: IGraphQLActionConfig,
  overrideConfig?: IPropData,
) => {
  const headers = merge(tryParse(config.headers), overrideConfig?.headers)
  const variables = merge(tryParse(config.variables), overrideConfig?.variables)

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
    return replaceStateInProps(config.values, this.store.current.state.values)
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
    const runner = (...args: Array<unknown>) => {
      const successAction = this.successAction?.current
      const errorAction = this.errorAction?.current
      const resource = this.resource.current
      const overrideConfig = args[0] as IPropData

      const config = replaceStateInProps(
        this.config.values,
        this.store.current.state.values,
      )

      state.set(this.name, { response: null })
      state.set(this.name, { error: null })

      const fetchPromise =
        resource.type === IResourceType.GraphQL
          ? graphqlFetch(
              this._graphqlClient,
              config as IGraphQLActionConfig,
              overrideConfig,
            )
          : restFetch(
              this._restClient,
              config as IRestActionConfig,
              overrideConfig,
            )

      return fetchPromise
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
