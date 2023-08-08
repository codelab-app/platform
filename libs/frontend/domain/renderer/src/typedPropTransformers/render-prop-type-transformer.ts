import type {
  IField,
  IPageNode,
  ITypedPropTransformer,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  extractTypedPropValue,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ExtendedModel, model } from 'mobx-keystone'
import { BaseRenderPipe } from '../renderPipes/render-pipe.base'
import { cloneComponent } from '../utils'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind RenderPropType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <(...args) => ReactNode - A function that renders the component with id: $componentId>
 * }
 */

const matchPropsToFields = (fields: Array<IField> = [], props: Array<object>) =>
  props.reduce(
    (acc, val, index) =>
      fields[index]?.key
        ? { ...acc, [fields[index]?.key as string]: val }
        : acc,
    {},
  )

@model('@codelab/RenderPropTypeTransformer')
export class RenderPropTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, node: IPageNode) {
    const { expressionTransformer } = this.renderer
    const propValue = extractTypedPropValue(prop)

    if (!propValue) {
      return ''
    }

    if (hasStateExpression(propValue) && expressionTransformer.initialized) {
      return expressionTransformer.transpileAndEvaluateExpression(propValue)
    }

    const component = this.componentService.components.get(propValue)
    const fields = component?.api.current.fields
    // can't return prop object because it will be passed as React Child, which will throw an error
    const fallback = ''

    if (!component) {
      console.error('Component not found')

      return fallback
    }

    // spread is required to access all args not just the first one
    return (...renderPropArgs: Array<object>) => {
      // match props to fields by order first to first and so on.
      const props = matchPropsToFields(fields, renderPropArgs)
      const clonedComponent = cloneComponent(component, node, props)

      if (!clonedComponent) {
        console.error('Failed to clone component')

        return fallback
      }

      clonedComponent.props.current.setMany(props)
      this.renderer.addRuntimeProps(componentRef(clonedComponent.id))

      const rootElement = clonedComponent.rootElement.current

      return this.renderer.renderElement(rootElement)
    }
  }
}
