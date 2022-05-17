import { getComponentService } from '@codelab/frontend/presenter/container'
import { IElement, ITypeKind, TypedValue } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { Model, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderService } from '../renderServiceContext'
import { getRootElement } from '../utils/getRootElement'

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
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.RenderPropsType
  }

  canHandleValue(value: TypedValue<any>): boolean {
    const renderer = getRenderService(this)
    const componentService = getComponentService(this)

    return (
      typeof value.value === 'string' &&
      !!getRootElement(value, renderer.tree, componentService)
    )
  }

  public transform(value: TypedValue<any>): any {
    const renderer = getRenderService(this)
    const componentService = getComponentService(this)
    const rootElement = getRootElement(value, renderer.tree, componentService)

    if (!rootElement) {
      return value
    }

    return this.makeRenderProp(rootElement)
  }

  private makeRenderProp(element: IElement) {
    const renderer = getRenderService(this)

    return (...renderPropArgs: Array<any>) =>
      renderer.renderElement(element, mergeProps(...renderPropArgs))
  }
}
