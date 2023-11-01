import type { ITypedPropTransformer } from '@codelab/frontend/abstract/application'
import { getRunnerId } from '@codelab/frontend/abstract/application'
import type { IPageNode, TypedProp } from '@codelab/frontend/abstract/domain'
import {
  extractTypedPropValue,
  isComponent,
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

    const runner = this.renderer.runtimeAction({ id: actionId }).runner(node)

    // const fallback = () =>
    //   console.error(`fail to call action with id ${prop.value}`)

    return runner
  }
}
