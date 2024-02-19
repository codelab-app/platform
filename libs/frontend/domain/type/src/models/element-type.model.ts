import type { IElementTypeModel } from '@codelab/frontend/abstract/domain'
import type {
  IElementTypeDto,
  IElementTypeKind,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ elementKind, id, kind, name }: IElementTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    elementKind,
    id,
    kind,
    name,
  })
}

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(createBaseType(ITypeKind.ElementType), {
    elementKind: prop<IElementTypeKind>(),
  })
  implements IElementTypeModel
{
  public static create = create

  @modelAction
  writeCache(elementTypeDTO: Partial<IElementTypeDto>) {
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
}
