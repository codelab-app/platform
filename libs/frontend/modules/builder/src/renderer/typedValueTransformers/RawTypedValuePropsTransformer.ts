import { ITypeKind, TypedValue } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { BaseRenderPipe } from '../renderPipes/renderPipe.base'

/**
 * Transforms props with the following format.
 * Use as a fallback if other transformers are not applicable
 *
 *     {
 *        [$propName]: {
 *          type: $typeId,
 *          value: $value,
 *        },
 *     }
 *
 *     into :
 *
 *     {
 *        [$propName] : $value
 *     }
 */
@model('@codelab/RawTypedValuePropsTransformer')
export class RawTypedValuePropsTransformer
  extends ExtendedModel(BaseRenderPipe, {})
  implements ITypedValueTransformer
{
  public readonly handledKinds: ReadonlySet<ITypeKind> = new Set([
    ITypeKind.AppType,
    ITypeKind.ArrayType,
    ITypeKind.EnumType,
    ITypeKind.ElementType,
    ITypeKind.InterfaceType,
    ITypeKind.LambdaType,
    ITypeKind.MonacoType,
    ITypeKind.PageType,
    ITypeKind.PrimitiveType,
  ])

  canHandleTypeKind(kind: ITypeKind): boolean {
    return this.handledKinds.has(kind)
  }

  canHandleValue(value: TypedValue<any>): boolean {
    return true
  }

  public transform(props: TypedValue<any>): any {
    if (!props?.value) {
      return props
    }

    return props.value
  }
}
