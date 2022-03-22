import { TypedValue, TypeKind } from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderContext } from '../renderContext'
import { getComponentRootElementFromProp } from '../utils/getComponentFromProp'

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
  extends Model({})
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: TypeKind): boolean {
    return typeKind === TypeKind.ReactNodeType
  }

  canHandleValue(value: TypedValue<any>): boolean {
    const renderer = getRenderContext(this)

    return (
      typeof value.value === 'string' &&
      !!getComponentRootElementFromProp(value, renderer.tree)
    )
  }

  public transform(value: TypedValue<any>): any {
    const renderer = getRenderContext(this)
    const rootElement = getComponentRootElementFromProp(value, renderer.tree)

    if (!rootElement) {
      return value
    }

    return renderer.renderElement(rootElement)
  }
}
