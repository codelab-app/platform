import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { PrimitiveTypeFragment, TypeFragment } from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'

@model('codelab/PrimitiveType')
export class PrimitiveType
  extends Model({
    ...baseTypeProps(TypeKind.PrimitiveType),
    primitiveKind: prop<PrimitiveTypeKind>(),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.PrimitiveType) {
      return
    }

    this.primitiveKind = fragment.primitiveKind
  }

  public static fromFragment({
    id,
    typeKind,
    name,
    primitiveKind,
  }: PrimitiveTypeFragment): PrimitiveType {
    return new PrimitiveType({ id, typeKind, name, primitiveKind })
  }
}
