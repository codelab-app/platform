import type { TypedProp } from '@codelab/frontend-abstract-domain'

import {
  type IRuntimePageNode,
  isRuntimeElement,
  type ITypedPropTransformer,
} from '@codelab/frontend-abstract-application'
import { extractTypedPropValue } from '@codelab/frontend-abstract-domain'
import { hasExpression } from '@codelab/shared-infra-eval'
import { ExtendedModel, model } from 'mobx-keystone'

import { BaseRenderPipe } from '../render-pipes'

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
  public transform(
    prop: TypedProp,
    key: string,
    runtimeNode: IRuntimePageNode,
  ) {
    const { expressionTransformer } = this.rendererService
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    // propValue is a custom JS component
    if (hasExpression(prop.value)) {
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

    const runtimeParent = isRuntimeElement(runtimeNode)
      ? runtimeNode
      : undefined

    const runtimeComponent = this.runtimeComponentService.add(
      component,
      runtimeParent,
      key,
      undefined,
      true,
    )

    runtimeComponent.render()

    return runtimeComponent.rendered
  }
}
