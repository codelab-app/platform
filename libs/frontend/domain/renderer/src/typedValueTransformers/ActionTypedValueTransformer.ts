import { ITypeKind, TypedValue } from '@codelab/frontend/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
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

  canHandleValue(value: TypedValue<any>): boolean {
    return (
      isString(value.value) &&
      Boolean(
        this.renderer.appStore?.current.actions.find(
          (a) => a.id === value.value,
        ),
      )
    )
  }

  public transform(props: TypedValue<any>): any {
    const actionId = props?.value

    if (!isString(actionId)) {
      return props
    }

    const action = this.renderer.appStore?.current.actions.find(
      (a) => a.id === actionId,
    )

    if (!action) {
      // this shouldn't happen, we check in canHandleValue
      return props
    }

    return `{{${action.name}}}`
  }
}
