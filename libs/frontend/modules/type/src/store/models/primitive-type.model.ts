import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IPrimitiveType, TypeKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { PrimitiveTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/PrimitiveType')
export class PrimitiveType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.PrimitiveType),
    props: {
      primitiveKind: prop<PrimitiveTypeKind>(),
    },
  }))
  implements IPrimitiveType
{
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
