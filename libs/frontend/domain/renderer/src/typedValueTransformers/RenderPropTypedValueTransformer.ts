import type { IPropData, TypedValue } from '@codelab/frontend/abstract/core'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'

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

  public transform(value: TypedValue<string>) {
    if (hasStateExpression(value.value)) {
      return expressionTransformer.transpileAndEvaluateExpression(value.value)
    }

    const id = value.value
    const component = this.componentService.components.get(id)

    // spread is required to access all args not just the first one
    return (...renderPropArgs: Array<object>) => {
      const props: IPropData = renderPropArgs.reduce(
        (acc, val, index) => ({ ...acc, [index]: val }),
        {},
      )

      // accept zero as a key value
      if (props[value.key] === undefined || props[value.key] === null) {
        return value
      }

      // component has no instance element
      const componentClone = component?.clone(
        `${props[value.key]}-${component.name}`,
      )

      const rootElement = componentClone?.rootElement.current

      if (!rootElement) {
        return value
      }

      componentClone.store.current.initialState.setMany(props)

      return this.renderer.renderElement(rootElement)
    }
  }
}
