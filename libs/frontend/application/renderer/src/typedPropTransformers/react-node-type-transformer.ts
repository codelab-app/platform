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
  public transform(prop: TypedProp, node: IPageNode) {
    const { expressionTransformer } = this.renderer
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    // propValue is a custom JS component
    if (hasStateExpression(prop.value) && expressionTransformer.initialized) {
      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(propValue)

      return typeof transpiledValue === 'function'
        ? transpiledValue.call(expressionTransformer.context)
        : transpiledValue
    }

    const component = this.componentDomainService.components.get(propValue)
    const fallback = ''

    if (!component) {
      console.error('Component not found')

      return fallback
    }

    const runtimeNode = isElement(node)
      ? this.rendererService.runtimeElement(node)
      : this.rendererService.runtimeContainerNode(node)

    if (!runtimeNode) {
      console.error('Runtime node not found')

      return fallback
    }

    const runtimeComponent =
      runtimeNode.runtimeProps?.addRuntimeComponentModel(component)

    if (!runtimeComponent) {
      console.error('Unable to create runtime component')

      return fallback
    }

    return runtimeComponent.render
  }
}
