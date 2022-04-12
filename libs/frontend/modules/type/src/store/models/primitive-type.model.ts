import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IPrimitiveType,
  IPrimitiveTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  primitiveKind,
  owner,
}: IPrimitiveTypeDTO): PrimitiveType =>
  new PrimitiveType({
    id,
    typeKind,
    name,
    primitiveKind,
    ownerAuth0Id: owner?.auth0Id,
  })

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
  updateFromFragment(fragment: ITypeDTO): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.PrimitiveType) {
      return
    }

    this.primitiveKind = fragment.primitiveKind
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)

    if (!input.primitiveKind) {
      throw new Error('PrimitiveType must have a primitiveKind')
    }

    this.primitiveKind = input.primitiveKind
  }

  public static fromFragment = fromFragment
}
