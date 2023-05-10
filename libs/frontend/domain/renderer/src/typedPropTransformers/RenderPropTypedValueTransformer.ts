import type {
  IElement,
  IField,
  TypedProp,
} from '@codelab/frontend/abstract/core'
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

@model('@codelab/RenderPropTypedValueTransformer')
export class RenderPropTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, element: IElement) {
    if (hasStateExpression(prop.value) && expressionTransformer.initialized) {
      return expressionTransformer.transpileAndEvaluateExpression(prop.value)
    }

    const component = this.componentService.components.get(prop.value)
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
      const componentClone = cloneComponent(component, element, props)

      if (!componentClone) {
        console.error('Failed to clone component')

        return fallback
      }

      const rootElement = componentClone.rootElement.current
      componentClone.store.current.setInitialState(props)

      return this.renderer.renderElement(rootElement)
    }
  }
}
