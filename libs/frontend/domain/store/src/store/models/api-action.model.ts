import type {
  IAnyAction,
  IApiAction,
  IApiActionConfig,
  IApiActionDTO,
  IGraphQLActionConfig,
  IPropData,
  IResource,
  IRestActionConfig,
} from '@codelab/frontend/abstract/core'
import { IProp } from '@codelab/frontend/abstract/core'
import { Prop, propRef } from '@codelab/frontend/domain/prop'
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
import { createBaseAction } from './base-action.model'
import { storeRef } from './store.model'

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
    config: prop<Ref<IProp>>(),
    successAction: prop<Nullish<Ref<IAnyAction>>>(),
    errorAction: prop<Nullish<Ref<IAnyAction>>>(),
  })
  implements IApiAction
{
  @modelAction
  private replaceStateInConfig(config: IProp) {
    return replaceStateInProps(config.values, this.store.current.state.values)
  }

  @computed
  get _resourceConfig() {
    return this.replaceStateInConfig(this.resource.current.config.current)
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
        this.config.current.values,
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
  writeCache({
    resource,
    config,
    errorAction,
    successAction,
    store,
  }: Partial<IApiActionDTO>) {
    this.resource = resource ? resourceRef(resource.id) : this.resource
    this.config = config ? propRef<IProp>(config.id) : this.config
    this.errorAction = errorAction
      ? actionRef(errorAction.id)
      : this.errorAction
    this.successAction = successAction
      ? actionRef(successAction.id)
      : this.successAction
    this.store = store ? storeRef(store.id) : this.store

    return this
  }
}
