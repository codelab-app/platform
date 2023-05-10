import type { IElement, TypedProp } from '@codelab/frontend/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ITypedPropTransformer } from '../abstract/ITypedPropTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'

/**
 * Transforms props from the following format:
 * {
 *   [$propName]: {
 *     type: '<id of a type with kind ElementType>',
 *     value: '$elementId'
 *   }
 * }
 *
 * into:
 * {
 *   [$propName]: <ReactNode - Rendered element from the same tree with id - $elementId>
 * }
 */
@model('@codelab/ElementTypedValueTransformer')
export class ElementTypedValueTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, element: IElement) {
    const targetElement = element.closestContainerNode.elements.find(
      (el) => el.id === prop.value,
    )

    if (!targetElement) {
      return prop
    }

    return this.renderer.renderElement(targetElement)
  }
}
