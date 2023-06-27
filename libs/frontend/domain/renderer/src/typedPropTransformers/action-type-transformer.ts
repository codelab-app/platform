import {
  getRunnerId,
  type IPageNode,
  type ITypedPropTransformer,
  type TypedProp,
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

    const state = node.store.current.state

    const actionRunner = this.renderer.actionRunners.get(
      getRunnerId(node.store.id, prop.value),
    )

    const fallback = () =>
      console.error(`fail to call action with id ${prop.value}`)

    const runner = actionRunner?.runner || fallback

    return runner.bind(state)
  }
}
