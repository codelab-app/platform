import { TypedValue, TypeKind } from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'

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
  extends Model({})
  implements ITypedValueTransformer
{
  public readonly handledKinds: ReadonlySet<TypeKind> = new Set([
    TypeKind.AppType,
    TypeKind.ArrayType,
    TypeKind.EnumType,
    TypeKind.ElementType,
    TypeKind.InterfaceType,
    TypeKind.LambdaType,
    TypeKind.MonacoType,
    TypeKind.PageType,
    TypeKind.PrimitiveType,
  ])

  canHandleTypeKind(typeKind: TypeKind): boolean {
    return this.handledKinds.has(typeKind)
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
