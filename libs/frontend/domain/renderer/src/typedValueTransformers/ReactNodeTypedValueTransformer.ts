import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ITypeKind, TypedValue } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
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
    const elementService = getElementService(this)

    return (
      typeof value.value === 'string' &&
      Boolean(getRootElement(value, componentService, elementService))
    )
  }

  public transform(value: TypedValue<any>): any {
    const componentService = getComponentService(this)
    const elementService = getElementService(this)
    const rootElement = getRootElement(value, componentService, elementService)

    if (!rootElement) {
      return value
    }

    return this.renderer.renderElement(rootElement)
  }
}
