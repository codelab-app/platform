import type {
  IRuntimeAction,
  IRuntimeNode,
  IRuntimeStore,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IApiActionModel,
  IBaseResourceConfigData,
  ICodeActionModel,
  IElementModel,
  IGraphQLActionConfig,
  IPageNode,
  IRestActionConfig,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  elementRef,
  IPropModel,
  isElement,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { tryParse } from './utils'

const restFetch = (
  client: Axios,
  config: IRestActionConfig,
  overrideConfig?: IPropData,
) => {
  const data = merge(tryParse(config.body), overrideConfig?.['body'])
  const headers = merge(tryParse(config.headers), overrideConfig?.['headers'])
  const parsedParams = tryParse(config.queryParams)

  return client.request({
    data,
    headers,
    method: config.method as Method,
    // params should be an object to be properly used as url params
    params: isString(parsedParams) ? undefined : parsedParams,
    responseType: config.responseType,
    url: config.urlSegment,
  })
}

const graphqlFetch = (
  client: GraphQLClient,
  config: IGraphQLActionConfig,
  overrideConfig?: IPropData,
) => {
  const headers = merge(tryParse(config.headers), overrideConfig?.['headers'])

  const variables = merge(
    tryParse(config.variables),
    overrideConfig?.['variables'],
  )

  return client.request(config.query, variables, headers)
}

const create = (action: IActionModel, store: IStoreModel) => {
  // const component = rootElement.parentComponent?.current
  // more props will be added other then component
  // const props = component?.runtimeProp?.componentEvaluatedProps || {}

  return new RuntimeAction({
    actionRef: actionRef(action.id),
    runtimeStoreRef: runtimeStoreRef(store.id),
  })
}

@model('@codelab/RuntimeAction')
export class RuntimeAction
  extends Model(() => ({
    actionRef: prop<Ref<IActionModel>>(),
    fromProvider: prop(false),
    id: idProp,
    runtimeStoreRef: prop<Ref<IRuntimeStore>>(),
  }))
  implements IRuntimeAction
{
  static create = create

  @computed
  get runtimeStore() {
    return this.runtimeStoreRef.current
  }

  @computed
  get element() {
    return this.runtimeStore.runtimeElement.element
  }

  @computed
  get _graphqlClient() {
    const { headers, url } = this._resourceConfig
    const options = { headers: tryParse(headers) }

    return new GraphQLClient(url, options)
  }

  @computed
  get _resourceConfig() {
    return this.replaceStateInConfig(
      (this.actionRef.current as IApiActionModel).resource.current.config,
    ) as IBaseResourceConfigData
  }

  @computed
  get _restClient() {
    const { headers, url } = this._resourceConfig

    return axios.create({ baseURL: url, headers: tryParse(headers) })
  }

  @computed
  get apiRunner() {
    const action = this.actionRef.current as IApiActionModel

    const successAction = action.successAction
      ? this.renderer?.runtimeAction(action.successAction)
      : null

    const errorAction = action.errorAction
      ? this.renderer?.runtimeAction(action.errorAction)
      : null

    const resource = action.resource.current
    const config = action.config.values
    const graphQLClient = this._graphqlClient
    const restClient = this._restClient

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    return async function (...args: Array<unknown>) {
      const overrideConfig = args[1] as IPropData
      // @ts-expect-error: due to not using arrow function
      const _this = this as IEvaluationContext
      const evaluatedConfig = evaluateObject(config, { ..._this, args })

      const fetchPromise =
        resource.type === IResourceType.GraphQl
          ? graphqlFetch(
              graphQLClient,
              evaluatedConfig as IGraphQLActionConfig,
              overrideConfig,
            )
          : restFetch(
              restClient,
              evaluatedConfig as IRestActionConfig,
              overrideConfig,
            )

      try {
        const response = await fetchPromise

        // actions in the provider should not have access to the state of regular pages
        const successRunnerThis = successAction?.fromProvider
          ? { ..._this, state: _this.rootState }
          : _this

        return successAction?.runner.call(successRunnerThis, response)
      } catch (error) {
        // actions in the provider should not have access to the state of regular pages
        const errorRunnerThis = errorAction?.fromProvider
          ? { ..._this, state: _this.rootState }
          : _this

        return errorAction?.runner.call(errorRunnerThis, error)
      }
    }
  }

  @computed
  get codeRunner() {
    try {
      // eslint-disable-next-line no-new-func
      return new Function(
        `return function run(...args) {
          const actions = this.actions;
          const rootActions = this.rootActions;
          const state = this.state;
          const rootState = this.rootState;
          const refs = this.refs;
          const rootRefs = this.rootRefs;
          const url = this.url;
          const props = this.props;
          const componentProps = this.componentProps;
          return ${(this.actionRef.current as ICodeActionModel).code}(...args)
        }`,
      )()
    } catch (error) {
      console.log(error)

      return () => () => undefined
    }
  }

  @computed
  get renderer() {
    const renderService = getRendererService(this)

    return renderService.activeRenderer?.current
  }

  @computed
  runner() {
    const propsEvaluationContext = isElement(this.element)
      ? this.renderer?.runtimeElement(this.element)
      : this.renderer?.runtimeComponent(this.element)

    return this.actionRef.current.type === IActionKind.ApiAction
      ? this.apiRunner.bind(propsEvaluationContext)
      : this.codeRunner.bind(propsEvaluationContext)
  }

  @modelAction
  private replaceStateInConfig(config: IPropModel) {
    return evaluateObject(config.values, {
      actions: {},
      componentProps: {},
      props: {},
      refs: {},
      rootActions: {},
      rootRefs: {},
      rootState: {},
      state: {},
      url: {},
    })
  }
}
