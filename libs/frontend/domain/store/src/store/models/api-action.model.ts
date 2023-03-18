import type {
  IAction,
  IApiAction,
  IApiActionDTO,
  IGraphQLActionConfig,
  IPropData,
  IResource,
  IRestActionConfig,
} from '@codelab/frontend/abstract/core'
import { IProp } from '@codelab/frontend/abstract/core'
import { propRef } from '@codelab/frontend/domain/prop'
import { resourceRef } from '@codelab/frontend/domain/resource'
import { replaceStateInProps, tryParse } from '@codelab/frontend/shared/utils'
import {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import merge from 'lodash/merge'
import set from 'lodash/set'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createBaseAction } from './base-action.model'
import { storeRef } from './store.model'

const create = ({
  config,
  errorAction,
  id,
  name,
  resource,
  store,
  successAction,
}: IApiActionDTO) =>
  new ApiAction({
    config: propRef(config.id),
    errorAction: errorAction?.id ? actionRef(errorAction.id) : null,
    id,
    name,
    resource: resourceRef(resource.id),
    store: storeRef(store.id),
    successAction: successAction?.id ? actionRef(successAction.id) : null,
    type: IActionKind.ApiAction,
  })

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
    data,
    headers,
    method: config.method as Method,
    params,
    responseType: config.responseType,
    url: config.urlSegment,
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
    config: prop<Ref<IProp>>(),
    errorAction: prop<Nullish<Ref<IAction>>>(),
    resource: prop<Ref<IResource>>(),
    successAction: prop<Nullish<Ref<IAction>>>(),
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

  createRunner() {
    const name = this.name
    const successAction = this.successAction?.current
    const errorAction = this.errorAction?.current
    const resource = this.resource.current

    const config = this.store.current.replaceStateInProps(
      this.config.current.values,
    )

    const graphQLClient = this._graphqlClient
    const restClient = this._restClient

    return (...args: Array<unknown>) => {
      const overrideConfig = args[0] as IPropData

      const fetchPromise =
        resource.type === IResourceType.GraphQL
          ? graphqlFetch(
              graphQLClient,
              config as IGraphQLActionConfig,
              overrideConfig,
            )
          : restFetch(restClient, config as IRestActionConfig, overrideConfig)

      return fetchPromise
        .then((response) => {
          set(this, name, { response })

          return successAction?.createRunner()(...args)
        })
        .catch((error) => {
          set(this, name, { error: JSON.stringify(error) })

          return errorAction?.createRunner()(...args)
        })
    }
  }

  @modelAction
  writeCache({
    config,
    errorAction,
    name,
    resource,
    successAction,
  }: Partial<IApiActionDTO>) {
    this.name = name ?? this.name
    this.resource = resource ? resourceRef(resource.id) : this.resource
    this.config = config ? propRef<IProp>(config.id) : this.config
    this.errorAction = errorAction
      ? actionRef(errorAction.id)
      : this.errorAction
    this.successAction = successAction
      ? actionRef(successAction.id)
      : this.successAction

    return this
  }

  @modelAction
  toCreateInput(): ApiActionCreateInput {
    return {
      config: {
        create: {
          node: this.config.current.toCreateInput(),
        },
      },
      errorAction: {
        ApiAction: connectNodeId(this.errorAction?.id),
        CodeAction: connectNodeId(this.errorAction?.id),
      },
      id: this.id,
      name: this.name,
      resource: connectNodeId(this.resource.id),
      store: connectNodeId(this.store.id),
      successAction: {
        ApiAction: connectNodeId(this.successAction?.id),
        CodeAction: connectNodeId(this.successAction?.id),
      },
    }
  }

  @modelAction
  toUpdateInput(): ApiActionUpdateInput {
    return {
      config: {
        update: {
          node: this.config.current.toUpdateInput(),
        },
      },
      errorAction: {
        ApiAction: connectNodeId(this.errorAction?.id),
        CodeAction: connectNodeId(this.errorAction?.id),
      },
      name: this.name,
      resource: connectNodeId(this.resource.id),
      successAction: {
        ApiAction: connectNodeId(this.successAction?.id),
        CodeAction: connectNodeId(this.successAction?.id),
      },
    }
  }

  @modelAction
  toDeleteInput(): ApiActionDeleteInput {
    return {
      config: { where: {} },
    }
  }

  static create = create
}
