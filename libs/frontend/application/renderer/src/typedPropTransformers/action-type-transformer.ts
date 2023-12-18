import type { ITypedPropTransformer } from '@codelab/frontend/abstract/application'
import type { IPageNode, TypedProp } from '@codelab/frontend/abstract/domain'
import {
  extractTypedPropValue,
  isElement,
} from '@codelab/frontend/abstract/domain'
import { hasStateExpression } from '@codelab/frontend/application/shared/core'
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
  public transform(prop: TypedProp, node: IPageNode) {
    // unwrap custom action code so it is evaluated later
    if (hasStateExpression(prop.value)) {
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

    const runtimeNode = isElement(node)
      ? this.rendererService.runtimeElement(node)
      : this.rendererService.runtimeContainerNode(node)

    const runtimeAction = runtimeNode?.runtimeStore.runtimeAction({
      id: actionId,
    })

    const name = runtimeAction?.action.current.name

    const fallback = () =>
      console.error(`fail to get action with id ${prop.value}`)

    const actionRunner = name
      ? runtimeNode?.runtimeProps?.getActionRunner(name)
      : fallback

    return actionRunner
  }
}
