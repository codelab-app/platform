import type { ITypedPropTransformer } from '@codelab/frontend/abstract/application'
import {
  type IPageNode,
  isElement,
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

    const runtimeNode = isElement(node)
      ? this.rendererService.runtimeElement(node)
      : this.rendererService.runtimeContainerNode(node)

    const fallback = null

    if (!runtimeNode) {
      console.error('Runtime node not found')

      return fallback
    }

    const runtimeElement =
      runtimeNode.runtimeProps?.addRuntimeElementModel(targetElement)

    if (!runtimeElement) {
      console.error('Unable to create runtime element')

      return fallback
    }

    return runtimeElement.render
  }
}
