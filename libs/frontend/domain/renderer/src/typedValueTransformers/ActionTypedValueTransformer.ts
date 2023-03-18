import type { TypedValue } from '@codelab/frontend/abstract/core'
import { getActionService } from '@codelab/frontend/domain/store'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
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
 *   [$propName]: <ReactNode - Rendered action from the same tree with id - $actionId>
 * }
 */
@model('@codelab/ActionTypedValueTransformer')
export class ActionTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  canHandleTypeKind(kind: ITypeKind): boolean {
    return kind === ITypeKind.ActionType
  }

  canHandleValue(value: TypedValue<unknown>): boolean {
    const actionService = getActionService(this)

    const referencedAction = actionService.actionsList.find(
      (action) => action.id === value.value,
    )

    return isString(value.value) && Boolean(referencedAction)
  }

  public transform(props: TypedValue<unknown>) {
    const actionService = getActionService(this)

    const referencedAction = actionService.actionsList.find(
      (action) => action.id === props.value,
    )

    const state = referencedAction?.store.current.state

    return referencedAction && state ? state[referencedAction.name] : () => null
  }
}
