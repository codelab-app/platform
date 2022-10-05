import { IElement, TypedValue } from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'
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
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  canHandleTypeKind(typeKind: ITypeKind): boolean {
    return typeKind === ITypeKind.RenderPropsType
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
    const componentService = getComponentService(this)
    const elementService = getElementService(this)
    const rootElement = getRootElement(value, componentService, elementService)

    if (!rootElement) {
      return value
    }

    return this.makeRenderProp(rootElement)
  }

  private makeRenderProp(element: IElement) {
    return (renderPropArgs: Array<unknown>) =>
      this.renderer.renderElement(element, renderPropArgs)
  }
}
