import type {
  IActionModel,
  IActionRunner,
  IApiActionModel,
  ICodeActionModel,
  IElementModel,
  IEvaluationContext,
  IGraphQLFetchConfig,
  IRenderer,
  IRestFetchConfig,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  elementRef,
  getRenderService,
  getRunnerId,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/shared/utils'
import { IActionKind } from '@codelab/shared/abstract/core'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, prop } from 'mobx-keystone'

export const getRunner = (
  renderer?: IRenderer,
  actionId?: string,
  storeId?: string,
  providerStoreId?: string,
): { runner?: IActionRunner; fromProvider?: boolean } => {
  if (!renderer || !actionId || !storeId) {
    return {}
  }

  const runner = renderer.actionRunners.get(getRunnerId(storeId, actionId))

  if (!isNil(runner)) {
    return { fromProvider: false, runner }
  }

  if (!providerStoreId) {
    return {}
  }

  const providerRunner = renderer.actionRunners.get(
    getRunnerId(providerStoreId, actionId),
  )

  return {
    fromProvider: !isNil(providerRunner),
    runner: providerRunner,
  }
}

const create = (rootElement: IElementModel) => {
  const store = rootElement.store.current
  const component = rootElement.parentComponent?.current
  // more props will be added other then component
  const props = component?.runtimeProp?.componentEvaluatedProps || {}

  return store.actions.map(
    (action) =>
      new ActionRunner({
        actionRef: actionRef(action.id),
        elementRef: elementRef(rootElement.id),
        id: getRunnerId(store.id, action.id),
      }),
  )
}

@model('@codelab/ActionRunner')
export class ActionRunner
  extends Model(() => ({
    actionRef: prop<Ref<IActionModel>>(),
    elementRef: prop<Ref<IElementModel>>(),
    id: prop<string>(),
  }))
  implements IActionRunner
{
  static create = create

  @computed
  get apiRunner() {
    const action = this.actionRef.current as IApiActionModel

    const providerStoreId =
      this.renderer?.providerTree?.current.rootElement.current.store.id

    const storeId = this.elementRef.current.store.id

    const { fromProvider: isSuccessRunnerFromProvider, runner: successRunner } =
      getRunner(
        this.renderer,
        action.successAction?.id,
        storeId,
        providerStoreId,
      )

    const { fromProvider: isErrorRunnerFromProvider, runner: errorRunner } =
      getRunner(this.renderer, action.errorAction?.id, storeId, providerStoreId)

    const resource = action.resource.current
    const actionConfig = action.config.current.values

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    return async function (...args: Array<unknown>) {
      const overrideConfig = args[1]
      const config = merge(actionConfig, overrideConfig)
      // @ts-expect-error: due to not using arrow function
      const _this = this as IEvaluationContext
      const context = { ..._this, args }

      const evaluatedConfig = evaluateObject(
        config,
        context,
      ) as IGraphQLFetchConfig & IRestFetchConfig

      const fetchPromise = resource.client.fetch(evaluatedConfig)

      try {
        const response = await fetchPromise

        // actions in the provider should not have access to the state of regular pages
        const successRunnerThis = isSuccessRunnerFromProvider
          ? { ..._this, state: _this.rootState }
          : _this

        return successRunner?.runner.call(successRunnerThis, response)
      } catch (error) {
        // actions in the provider should not have access to the state of regular pages
        const errorRunnerThis = isErrorRunnerFromProvider
          ? { ..._this, state: _this.rootState }
          : _this

        return errorRunner?.runner.call(errorRunnerThis, error)
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
    const renderService = getRenderService(this)

    return renderService.activeRenderer?.current
  }

  @computed
  get runner() {
    return this.actionRef.current.type === IActionKind.ApiAction
      ? this.apiRunner
      : this.codeRunner
  }
}
