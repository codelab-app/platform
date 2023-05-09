import type {
  IAction,
  IApiAction,
  IApiActionDTO,
  IBaseResourceConfigData,
  IGraphQLActionConfig,
  IPropData,
  IResource,
  IRestActionConfig,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  IProp,
  propRef,
  resourceRef,
  storeRef,
} from '@codelab/frontend/abstract/core'
import { replaceStateInProps, tryParse } from '@codelab/frontend/shared/utils'
import {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getActionService } from '../action.service.context'
import { createBaseAction } from './base-action.model'

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
    source: prop<Nullable<Ref<IAction>>>(null),
    successAction: prop<Nullish<Ref<IAction>>>(),
  })
  implements IApiAction
{
  @computed
  get actionService() {
    return getActionService(this)
  }

  @modelAction
  clone(storeId: string) {
    const clonedErrorAction = this.errorAction?.current.clone(storeId)
    const clonedSuccessAction = this.errorAction?.current.clone(storeId)

    return this.actionService.add<IApiActionDTO>({
      __typename: IActionKind.ApiAction,
      config: { id: this.config.id },
      errorAction: clonedErrorAction ? { id: clonedErrorAction.id } : undefined,
      id: v4(),
      name: this.name,
      resource: { id: this.resource.id },
      store: { id: storeId },
      successAction: clonedSuccessAction
        ? { id: clonedSuccessAction.id }
        : undefined,
    })
  }

  @modelAction
  private replaceStateInConfig(config: IProp) {
    return replaceStateInProps(config.values, {})
  }

  @computed
  get _resourceConfig() {
    return this.replaceStateInConfig(
      this.resource.current.config.current,
    ) as IBaseResourceConfigData
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
  createRunner() {
    const successAction = this.successAction?.current
    const errorAction = this.errorAction?.current
    const resource = this.resource.current
    // FIXME:
    const config = replaceStateInProps(this.config.current.values, {})
    const graphQLClient = this._graphqlClient
    const restClient = this._restClient

    return async function runner(this: unknown, ...args: Array<unknown>) {
      const overrideConfig = args[0] as IPropData

      const fetchPromise =
        resource.type === IResourceType.GraphQL
          ? graphqlFetch(
              graphQLClient,
              config as IGraphQLActionConfig,
              overrideConfig,
            )
          : restFetch(restClient, config as IRestActionConfig, overrideConfig)

      try {
        const response = await fetchPromise

        return successAction?.createRunner().call(this, response)
      } catch (error) {
        return errorAction?.createRunner().call(this, error)
      }
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
