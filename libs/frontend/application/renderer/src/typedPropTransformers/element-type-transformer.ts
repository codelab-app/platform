import type {
  IRuntimeModel,
  ITypedPropTransformer,
} from '@codelab/frontend/abstract/application'
import {
  isRuntimeComponent,
  isRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { type TypedProp } from '@codelab/frontend/abstract/domain'
import { ExtendedModel, model } from 'mobx-keystone'
import { BaseRenderPipe } from '../renderPipes'

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
@model('@codelab/ElementTypeTransformer')
export class ElementTypeTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedPropTransformer
{
  public transform(prop: TypedProp, runtimeNode: IRuntimeModel) {
    const elements = isRuntimeElement(runtimeNode)
      ? runtimeNode.element.current.closestContainerNode.elements
      : isRuntimeComponent(runtimeNode)
      ? runtimeNode.component.current.elements
      : runtimeNode.page.current.elements

    const targetElement = elements.find((el) => el.id === prop.value)

    if (!targetElement) {
      return prop
    }

    const runtimeElement = runtimeNode.addElement(targetElement)

    return runtimeElement.render
  }
}
