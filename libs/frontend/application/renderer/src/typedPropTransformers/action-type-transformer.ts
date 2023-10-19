import type {
  IPageNode,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  extractTypedPropValue,
  getRunnerId,
  isComponent,
  isElement,
} from '@codelab/frontend/abstract/domain'
import { hasExpression } from '@codelab/frontend/shared/utils'
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
    if (hasExpression(prop.value)) {
      return prop.value
    }

    const componentStore = isComponent(node) ? node.store : undefined
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    const providerStore = isElement(node) ? node.providerStore : undefined

    const localActionRunner = this.renderer.actionRunners.get(
      getRunnerId(node.store.id, propValue),
    )

    const rootActionRunner = providerStore
      ? this.renderer.actionRunners.get(
          getRunnerId(providerStore.id, propValue),
        )
      : undefined

    const componentActionRunner = componentStore
      ? this.renderer.actionRunners.get(
          getRunnerId(componentStore.id, propValue),
        )
      : undefined

    const fallback = () =>
      console.error(`fail to call action with id ${prop.value}`)

    const actionRunner =
      localActionRunner ?? rootActionRunner ?? componentActionRunner

    if (actionRunner) {
      const context = isElement(node) ? node.propsEvaluationContext : {}

      return actionRunner.runner.bind(context)
    }

    return fallback
  }
}
