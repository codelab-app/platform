import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import type { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import type { IPrimitiveTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, primitiveKind }: IPrimitiveTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.PrimitiveType)

  return new PrimitiveType({
    id,
    kind,
    name,
    primitiveKind,
  })
}

@model('@codelab/PrimitiveType')
export class PrimitiveType
  extends ExtendedModel(createBaseType(ITypeKind.PrimitiveType), {
    primitiveKind: prop<PrimitiveTypeKind>(),
  })
  implements IPrimitiveTypeModel
{
  public static create = create

  @modelAction
  writeCache(primitiveTypeDto: Partial<IPrimitiveTypeDto>) {
    super.writeCache(primitiveTypeDto)

    this.primitiveKind = primitiveTypeDto.primitiveKind ?? this.primitiveKind

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
}
