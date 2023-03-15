import type {
  IElementType,
  IElementTypeDTO,
} from '@codelab/frontend/abstract/core'
import type { IElementTypeKind } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ elementKind, id, kind, name, owner }: IElementTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    elementKind,
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(createBaseType(ITypeKind.ElementType), {
    elementKind: prop<IElementTypeKind>(),
  })
  implements IElementType
{
  @modelAction
  writeCache(elementTypeDTO: Partial<IElementTypeDTO>) {
    super.writeCache(elementTypeDTO)

    this.elementKind = elementTypeDTO.elementKind ?? this.elementKind

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      elementKind: this.elementKind,
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      ...super.toUpdateInput(),
      update: {
        elementKind: this.elementKind,
      },
    })
  }

  public static create = create
}
