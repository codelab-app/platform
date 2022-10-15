import { TypedValue } from '@codelab/frontend/abstract/core'
import { getComponentService } from '@codelab/frontend/domain/component'
import { getElementService } from '@codelab/frontend/domain/element'
import { ITypeKind } from '@codelab/shared/abstract/core'
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

  canHandleValue(value: TypedValue<unknown>): boolean {
    const componentService = getComponentService(this)
    const elementService = getElementService(this)

    return (
      typeof value.value === 'string' &&
      Boolean(getRootElement(value, componentService, elementService))
    )
  }

  public transform(value: TypedValue<unknown>) {
    const rootElement = getRootElement(
      value,
      this.componentService,
      this.elementService,
    )

    if (!rootElement) {
      return value
    }

    return this.renderer.renderElement(rootElement)
  }
}
