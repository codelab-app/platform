import type {
  IRuntimePageNode,
  ITypedPropTransformer,
} from '@codelab/frontend-abstract-application'

import {
  isRuntimeComponent,
  isRuntimeElement,
} from '@codelab/frontend-abstract-application'
import { type TypedProp } from '@codelab/frontend-abstract-domain'
import { ExtendedModel, model } from 'mobx-keystone'

import { BaseRenderPipe } from '../render-pipes'

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
  public transform(
    prop: TypedProp,
    key: string,
    runtimeNode: IRuntimePageNode,
  ) {
    const closestContainerNode = isRuntimeElement(runtimeNode)
      ? runtimeNode.closestContainerNode
      : runtimeNode

    const elements = isRuntimeComponent(closestContainerNode)
      ? closestContainerNode.component.current.elements
      : closestContainerNode.page.current.elements

    const targetElement = elements.find((el) => el.id === prop.value)

    if (!targetElement) {
      return prop
    }

    const runtimeElement = this.runtimeElementService.add(
      targetElement,
      runtimeNode.compositeKey,
      key,
    )

    runtimeElement.render()

    return runtimeElement.rendered
  }
}
