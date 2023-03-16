import type {
  IPrimitiveType,
  IPrimitiveTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
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
  writeCache(primitiveTypeDTO: Partial<IPrimitiveTypeDTO>) {
    super.writeCache(primitiveTypeDTO)

    this.primitiveKind = primitiveTypeDTO.primitiveKind ?? this.primitiveKind

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
