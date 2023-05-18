import type {
  IElement,
  IField,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedValueTransformer } from '../abstract/i-typed-value-transformer'
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

@model('@codelab/RenderPropTypedValueTransformer')
export class RenderPropTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.RenderPropType
  }

  canHandleValue(value: TypedValue<unknown>): boolean {
    const isComponentId =
      isString(value.value) && this.componentService.components.has(value.value)

    const isComponentExpression = hasStateExpression(value.value)

    // either when it is a componentId or a component expression
    return isComponentId || isComponentExpression
  }

  public transform(value: TypedValue<string>, element: IElement) {
    const { expressionTransformer } = this.renderer

    if (hasStateExpression(value.value)) {
      return expressionTransformer.transpileAndEvaluateExpression(value.value)
    }

    const { value: componentId } = value
    const component = this.componentService.components.get(componentId)
    const fields = component?.api.current.fields

    if (!component) {
      console.error('Component not found')

      return value
    }

    // spread is required to access all args not just the first one
    return (...renderPropArgs: Array<object>) => {
      // match props to fields by order first to first and so on.
      const props = matchPropsToFields(fields, renderPropArgs)
      const componentClone = cloneComponent(component, element, props)

      if (!componentClone) {
        console.error('Failed to clone component')

        return value
      }

      const rootElement = componentClone.rootElement.current
      componentClone.store.current.setInitialState(props)

      return this.renderer.renderElement(rootElement)
    }
  }
}
