import type { TypedValue } from '@codelab/frontend/abstract/core'
import {
  expressionTransformer,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
import { getRootElement } from '../utils/getRootElement'

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
    const isComponentId = Boolean(getRootElement(value, this.componentService))
    const isComponentExpression = hasStateExpression(value.value)

    // either when it is a componentId or a component expression
    return isComponentId || isComponentExpression
  }

  public transform(value: TypedValue<string>) {
    if (hasStateExpression(value.value)) {
      return expressionTransformer.transpileAndEvaluateExpression(value.value)
    }

    const rootElement = getRootElement(value, this.componentService)

    if (!rootElement) {
      return value
    }

    return (renderPropArgs: Array<unknown>) =>
      this.renderer.renderElement(rootElement, renderPropArgs)
  }
}
