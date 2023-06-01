import type {
  IPageNode,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import { componentRef } from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
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
@model('@codelab/ReactNodeTypeTransformer')
export class ReactNodeTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, node: IPageNode) {
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

    // TODO: ReactNode unlike RenderProps doesn't take any props
    // figure out on what we should apply keyGenerator
    const clonedComponent = cloneComponent(component, node, {})

    if (!clonedComponent) {
      console.error('Failed to clone component')

      return fallback
    }

    this.renderer.addRuntimeProps(componentRef(clonedComponent.id))

    const rootElement = clonedComponent.rootElement.current

    return this.renderer.renderElement(rootElement)
  }
}
