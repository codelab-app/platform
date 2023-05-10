import type { TypedProp } from '@codelab/frontend/abstract/core'
import { getActionService } from '@codelab/frontend/domain/store'
import { computed } from 'mobx'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedPropTransformer } from '../abstract'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'

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
    const actionModel = this.actionService.action(prop.value)

    if (!actionModel) {
      return prop
    }

    // get action executor for its own store's state
    const actionExecutor = actionModel.store.current.state[actionModel.name]

    return actionExecutor || (() => null)
  }
}
