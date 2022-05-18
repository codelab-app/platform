import { ITypeKind, TypedValue } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { getRenderService } from '../render.service.context'
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
  implements ITypedValueTransformer
{
  canHandleTypeKind(kind: ITypeKind): boolean {
    return kind === ITypeKind.ElementType
  }

  canHandleValue(value: TypedValue<any>): boolean {
    return (
      typeof value.value === 'string' &&
      !!this.renderer.tree?.element(value.value)
    )
  }

  public transform(props: TypedValue<any>): any {
    const renderer = getRenderService(this)
    const elementId = props?.value

    if (typeof elementId !== 'string') {
      return props
    }

    const element = renderer.tree?.element(elementId)

    if (!element) {
      // this shouldn't happen, we check in canHandleValue
      return props
    }

    return renderer.renderElement(element)
  }
}
