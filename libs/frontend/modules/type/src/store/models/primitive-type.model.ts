import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  assertIsTypeKind,
  IPrimitiveType,
  IPrimitiveTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  primitiveKind,
  owner,
}: IPrimitiveTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PrimitiveType)

  return new PrimitiveType({
    id,
    kind,
    name,
    primitiveKind,
    ownerId: owner?.id,
  })
}

@model('@codelab/PrimitiveType')
export class PrimitiveType
  extends ExtendedModel(createTypeBase(ITypeKind.PrimitiveType), {
    primitiveKind: prop<PrimitiveTypeKind>(),
  })
  implements IPrimitiveType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.PrimitiveType) {
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
