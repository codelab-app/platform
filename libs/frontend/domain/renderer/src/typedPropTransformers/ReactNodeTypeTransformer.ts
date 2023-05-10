import type { IElement, TypedProp } from '@codelab/frontend/abstract/core'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedPropTransformer } from '../abstract/ITypedPropTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
import { cloneComponent } from '../utils'

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
@model('@codelab/ReactNodeTypedValueTransformer')
export class ReactNodeTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, element: IElement) {
    if (hasStateExpression(prop.value) && expressionTransformer.initialized) {
      // value is a custom JS component
      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(prop.value)

      return typeof transpiledValue === 'function'
        ? transpiledValue.call(expressionTransformer.context)
        : transpiledValue
    }

    const component = this.componentService.components.get(prop.value)
    // can't return prop object because it will be passed as React Child, which will throw an error
    const fallback = ''

    if (!component) {
      return fallback
    }

    const componentClone = cloneComponent(
      component,
      element,
      component.initialState,
    )

    if (!componentClone) {
      console.error('Failed to clone component')

      return fallback
    }

    const rootElement = componentClone.rootElement.current

    return this.renderer.renderElement(rootElement)
  }
}
