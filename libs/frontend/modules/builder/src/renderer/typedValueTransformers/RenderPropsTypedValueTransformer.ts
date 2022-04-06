import { getComponentService } from '@codelab/frontend/modules/component'
import { Element } from '@codelab/frontend/modules/element'
import { TypedValue, TypeKind } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { Model, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderContext } from '../renderServiceContext'
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
  canHandleTypeKind(typeKind: TypeKind): boolean {
    return typeKind === TypeKind.RenderPropsType
  }

  canHandleValue(value: TypedValue<any>): boolean {
    const renderer = getRenderContext(this)
    const componentService = getComponentService(this)

    return (
      typeof value.value === 'string' &&
      !!getComponentRootElementFromProp(value, renderer.tree, componentService)
    )
  }

  public transform(value: TypedValue<any>): any {
    const renderer = getRenderContext(this)
    const componentService = getComponentService(this)

    const rootElement = getComponentRootElementFromProp(
      value,
      renderer.tree,
      componentService,
    )

    if (!rootElement) {
      return value
    }

    return this.makeRenderProp(rootElement)
  }

  private makeRenderProp(element: Element) {
    const renderer = getRenderContext(this)

    return (...renderPropArgs: Array<any>) =>
      renderer.renderElement(element, mergeProps(...renderPropArgs))
  }
}
