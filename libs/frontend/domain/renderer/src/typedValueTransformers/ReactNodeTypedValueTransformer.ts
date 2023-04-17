import type { IPropData, TypedValue } from '@codelab/frontend/abstract/core'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isString from 'lodash/isString'
import { ExtendedModel, model } from 'mobx-keystone'
import { v4 } from 'uuid'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'

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
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.ReactNodeType
  }

  canHandleValue(value: TypedValue<unknown>): boolean {
    const isComponentId =
      isString(value.value) && this.componentService.components.has(value.value)

    const isComponentExpression = hasStateExpression(value.value)

    // either when it is a componentId or a component expression
    return isComponentId || isComponentExpression
  }

  public transform(value: TypedValue<string>) {
    // value is a custom JS component
    if (hasStateExpression(value.value)) {
      const transpiledValue =
        expressionTransformer.transpileAndEvaluateExpression(value.value)

      return typeof transpiledValue === 'function'
        ? transpiledValue.call(expressionTransformer.context)
        : transpiledValue
    }

    const id = value.value
    const component = this.componentService.components.get(id)
    // component has no instance element
    const componentClone = component?.clone(v4())
    const rootElement = componentClone?.rootElement.current

    if (!rootElement) {
      return value
    }

    return this.renderer.renderElement(rootElement)
  }
}
