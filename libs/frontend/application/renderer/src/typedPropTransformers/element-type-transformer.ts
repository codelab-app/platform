import {
  type IPageNode,
  isElement,
  type ITypedPropTransformer,
  type TypedProp,
} from '@codelab/frontend/abstract/domain'
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
  public transform(prop: TypedProp, node: IPageNode) {
    const elements = isElement(node)
      ? node.closestContainerNode.elements
      : node.elements

    const targetElement = elements.find((el) => el.id === prop.value)

    if (!targetElement) {
      return prop
    }

    return this.renderer.renderElement(targetElement)
  }
}
