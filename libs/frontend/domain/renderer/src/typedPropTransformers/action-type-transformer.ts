import type {
  IPageNode,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import {
  getActionRunnerThisObject,
  getRunnerId,
  isElementPageNode,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ExtendedModel, model } from 'mobx-keystone'
import { BaseRenderPipe } from '../renderPipes/render-pipe.base'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind ActionType>',
 *     value: '$actionId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: action function
 * }
 */
@model('@codelab/ActionTypeTransformer')
export class ActionTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, node: IPageNode) {
    // unwrap custom action code so it is evaluated later
    if (hasStateExpression(prop.value)) {
      return prop.value
    }

    const providerStore = isElementPageNode(node)
      ? node.providerStore
      : undefined

    const urlProps = isElementPageNode(node) ? node.urlProps : undefined

    const localActionRunner = this.renderer.actionRunners.get(
      getRunnerId(node.store.id, prop.value),
    )

    const rootActionRunner = providerStore
      ? this.renderer.actionRunners.get(
          getRunnerId(providerStore.id, prop.value),
        )
      : undefined

    const fallback = () =>
      console.error(`fail to call action with id ${prop.value}`)

    const actionRunner = localActionRunner ?? rootActionRunner

    if (actionRunner) {
      const _this = getActionRunnerThisObject(
        actionRunner,
        node.store,
        providerStore,
        urlProps,
      )

      return actionRunner.runner.bind(_this)
    }

    return fallback
  }
}
