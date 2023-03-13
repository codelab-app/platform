import type { IPrimitiveType } from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const create = ({
  id,
  kind,
  name,
  owner,
  primitiveKind,
}: IPrimitiveTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.PrimitiveType)

  return new PrimitiveType({
    id,
    kind,
    name,
    owner,
    primitiveKind,
  })
}

@model('@codelab/PrimitiveType')
export class PrimitiveType
  extends ExtendedModel(createBaseType(ITypeKind.PrimitiveType), {
    primitiveKind: prop<PrimitiveTypeKind>(),
  })
  implements IPrimitiveType
{
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.PrimitiveType) {
      throw new Error('PrimitiveType')
    }

    this.primitiveKind = fragment.primitiveKind

    return this
  }

  @modelAction
  writeCache(primitiveTypeDTO: IPrimitiveTypeDTO) {
    updateBaseTypeCache(this, primitiveTypeDTO)

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      primitiveKind: this.primitiveKind,
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      update: {
        primitiveKind: this.primitiveKind,
      },
    })
  }

  public static create = create
}
