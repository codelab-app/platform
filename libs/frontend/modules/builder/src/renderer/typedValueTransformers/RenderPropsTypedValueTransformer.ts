import { Element } from '@codelab/frontend/modules/element'
import { TypedValue, TypeKind } from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderContext } from '../renderContext'
import { getComponentRootElementFromProp } from '../utils/getComponentFromProp'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind RenderPropsType>',
 *     value: '$componentId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <(...args) => ReactNode - A function that renders the component with id: $componentId>
 * }
 */
@model('@codelab/RenderPropsTypedValueTransformer')
export class RenderPropsTypedValueTransformer
  extends Model({})
  implements ITypedValueTransformer
{
  public readonly handledKinds: ReadonlySet<TypeKind> = new Set([])

  canHandleTypeKind(typeKind: TypeKind): boolean {
    return typeKind === TypeKind.RenderPropsType
  }

  canHandleValue(value: TypedValue<any>): boolean {
    const renderer = getRenderContext(this)

    return (
      typeof value.value === 'string' &&
      !!getComponentRootElementFromProp(value, renderer.tree)
    )
  }

  public transform(value: any): any {
    const renderer = getRenderContext(this)
    const rootElement = getComponentRootElementFromProp(value, renderer.tree)

    if (!rootElement) {
      return value
    }

    return this.makeRenderProp(rootElement)
  }

  private makeRenderProp(element: Element) {
    const renderer = getRenderContext(this)

    return (...renderPropArgs: Array<any>) =>
      renderer.renderElement(element, renderPropArgs)
  }
}
