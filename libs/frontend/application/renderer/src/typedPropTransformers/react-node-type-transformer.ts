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
 *     type: '<id of a type with kind ReactNodeType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <ReactNode - Rendered component with id: $componentId>
 * }
 */
@model('@codelab/ReactNodeTypeTransformer')
export class ReactNodeTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, key: string, runtimeNode: IRuntimeModel) {
    const { expressionTransformer } = this.renderer
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    // propValue is a custom JS component
    if (hasExpression(prop.value) && expressionTransformer.initialized) {
      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(propValue)

      if (typeof transpiledValue === 'function') {
        try {
          return transpiledValue.call(expressionTransformer.context)
        } catch (error) {
          console.error('Error while evaluating expression', error)
        }
      }

      return transpiledValue
    }

    const component = this.componentDomainService.components.get(propValue)
    const fallback = ''

    if (!component) {
      console.error('Component not found')

      return fallback
    }

    const runtimeComponent = this.runtimeComponentService.add(
      component,
      runtimeNode,
      [],
      key,
      undefined,
      true,
    )

    return runtimeComponent.render
  }
}
