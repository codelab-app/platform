import type {
  IRuntimeModel,
  ITypedPropTransformer,
} from '@codelab/frontend/abstract/application'
import type { TypedProp } from '@codelab/frontend/abstract/domain'
import { extractTypedPropValue } from '@codelab/frontend/abstract/domain'
import { hasExpression } from '@codelab/shared/utils'
import { ExtendedModel, model } from 'mobx-keystone'
import { BaseRenderPipe } from '../renderPipes'

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
  public transform(prop: TypedProp, key: string, runtimeNode: IRuntimeModel) {
    // unwrap custom action code so it is evaluated later
    if (hasExpression(prop.value)) {
      return prop.value
    }

    /**
     * The prop value here is the actionId
     *
     * TODO: Need to make the code more self-documenting
     */
    const actionId = extractTypedPropValue(prop)

    if (!actionId) {
      return ''
    }

    const runtimeAction = runtimeNode.runtimeStore.runtimeAction({
      id: actionId,
    })

    const name = runtimeAction?.action.current.name

    return [...runtimeNode.runtimeStore.runtimeActions.values()].some(
      (ra) => ra.action.id === actionId,
    )
      ? `{{actions['${name}']}}`
      : `{{rootActions['${name}']}}`
  }
}
