import type {
  IElement,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import { BaseRenderPipe } from '../renderPipes/render-pipe.base'
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
    const { expressionTransformer } = this.renderer

    // value is a custom JS component
    if (hasStateExpression(prop.value) && expressionTransformer.initialized) {
      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(prop.value)

      return typeof transpiledValue === 'function'
        ? transpiledValue.call(expressionTransformer.context)
        : transpiledValue
    }

    const { value: componentId } = prop
    const component = this.componentService.components.get(componentId)
    const fallback = ''
    if (!component) {
      console.error('Component not found')

      return fallback
    }

    const componentClone = cloneComponent(
      component,
      element,
      element.store.current.state,
    )

    if (!componentClone) {
      console.error('Failed to clone component')

      return fallback
    }

    const rootElement = componentClone.rootElement.current

    return this.renderer.renderElement(rootElement)
  }
}
