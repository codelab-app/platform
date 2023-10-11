import type {
  IRuntimeActionDTO,
  IRuntimeActionModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IApiActionModel,
  ICodeActionModel,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = ({ action, runtimeStore }: IRuntimeActionDTO) =>
  new RuntimeActionModel({ action, runtimeStore })

@model('@codelab/RuntimeAction')
export class RuntimeActionModel
  extends Model(() => ({
    action: prop<Ref<IActionModel>>(),
    id: idProp,
    runtimeStore: prop<Ref<IRuntimeStoreModel>>(),
  }))
  implements IRuntimeActionModel
{
  static create = create

  @computed
  get apiRunner() {
    const action = this.action.current as IApiActionModel

    const successAction = action.successAction
      ? this.runtimeStore.current.runtimeAction(action.successAction)
      : null

    const errorAction = action.errorAction
      ? this.runtimeStore.current.runtimeAction(action.errorAction)
      : null

    const resource = action.resource.current

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    return async function (...args: Array<unknown>) {
      const overrideConfig = args[1]
      const config = merge(action.config.values, overrideConfig)
      // @ts-expect-error: due to not using arrow function
      const _this = this as IEvaluationContext
      const context = { ..._this, args }
      const evaluatedConfig = evaluateObject(config, context)

      const fetchPromise = resource.client.fetch(
        evaluatedConfig as IResourceFetchConfig,
      )

      // errors are handled by resource client
      const response = await fetchPromise

      if (response.error) {
        const runner = errorAction?.runner.bind(_this)

        return runner?.(response)
      }

      const runner = successAction?.runner.bind(_this)

      return runner?.(response)
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
          return ${(this.action.current as ICodeActionModel).code}(...args)
        }`,
      )()
    } catch (error) {
      console.log(error)

      return () => undefined
    }
  }

  @computed
  get runner() {
    // get run context
    return this.action.current.type === IActionKind.ApiAction
      ? this.apiRunner
      : this.codeRunner
  }
}
