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
import { Method } from 'axios'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { actionRef } from './action.ref'
import { createBaseAction, updateBaseAction } from './base-action.model'

const hydrate = (action: IApiActionDTO): IApiAction => {
  assertIsActionKind(action.type, IActionKind.ApiAction)

  return new ApiAction({
    id: action.id,
    name: action.name,
    storeId: action.store.id,
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

const restFetch = (resource: IResource, config: IRestActionConfig) => {
  const data = tryParse(config.body)
  const params = tryParse(config.queryParams)
  const headers = tryParse(config.headers)

  return resource.restClient.request({
    method: config.method as Method,
    url: config.urlSegment,
    responseType: config.responseType,
    data,
    params,
    headers,
  })
}

const graphqlFetch = (resource: IResource, config: IGraphQLActionConfig) => {
  const headers = tryParse(config.headers)
  const variables = tryParse(config.variables)

  return resource.graphqlClient.request(config.query, variables, headers)
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
  createRunner(state: IProp) {
    const successAction = this.successAction?.current
    const errorAction = this.errorAction?.current
    const resource = this.resource.current
    const config = this.config.values

    const runner = (...args: Array<unknown>) => {
      const fetchPromise =
        resource.type === IResourceType.GraphQL
          ? graphqlFetch(resource, config as IGraphQLActionConfig)
          : restFetch(resource, config as IRestActionConfig)

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

    return this
  }
}
