import type {
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import { getActionService } from '@codelab/frontend/domain/store'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
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
  @computed
  private get actionService() {
    return getActionService(this)
  }

  public transform(prop: TypedProp) {
    // unwrap custom action code so it is evaluated later
    if (hasStateExpression(prop.value)) {
      return prop.value
    }

    const actionModel = this.actionService.action(prop.value)

    if (!actionModel) {
      return prop
    }

    // get action executor for its own store's state
    const actionExecutor = actionModel.store.current.state[actionModel.name]

    return actionExecutor || (() => null)
  }
}
