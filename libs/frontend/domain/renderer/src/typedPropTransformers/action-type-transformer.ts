import type {
  IPageNode,
  IPropData,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import { getRunnerId, isElementPageNode } from '@codelab/frontend/abstract/core'
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

    const actionRunner = this.renderer.actionRunners.get(
      getRunnerId(node.store.id, prop.value),
    )

    const rootActionRunner = providerStore
      ? this.renderer.actionRunners.get(
          getRunnerId(providerStore.id, prop.value),
        )
      : undefined

    const fallback = () =>
      console.error(`fail to call action with id ${prop.value}`)

    const runner = actionRunner ?? rootActionRunner

    const _this: { state: IPropData; rootState?: IPropData } = {
      state: node.store.current.state,
    }

    // If the action used in a regular page is from the provider, the `state` to use
    // in the action should be the `state` from the provider store
    if (providerStore) {
      const isActionFromProvider =
        runner?.actionRef.current.store.id === providerStore.id

      _this[isActionFromProvider ? 'state' : 'rootState'] =
        providerStore.current.state
    }

    return runner?.runner.bind(_this) ?? fallback
  }
}
