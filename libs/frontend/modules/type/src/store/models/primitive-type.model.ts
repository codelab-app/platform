import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IPrimitiveType,
  IPrimitiveTypeDTO,
  ITypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
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
    ownerId: owner?.id,
  })

@model('@codelab/PrimitiveType')
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
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.typeKind !== TypeKind.PrimitiveType) {
      return
    }

    this.primitiveKind = fragment.primitiveKind
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  //
  //   if (!input.primitiveKind) {
  //     throw new Error('PrimitiveType must have a primitiveKind')
  //   }
  //
  //   this.primitiveKind = input.primitiveKind
  // }

  public static hydrate = hydrate
}
