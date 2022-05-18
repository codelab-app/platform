import { getComponentService } from '@codelab/frontend/presenter/container'
import { ITypeKind, TypedValue } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderService } from '../renderServiceContext'
import { getRootElement } from '../utils/getRootElement'

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

  canHandleValue(value: TypedValue<any>): boolean {
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

    return renderer.renderElement(rootElement)
  }
}
