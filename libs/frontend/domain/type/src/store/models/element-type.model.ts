import type { IElementType } from '@codelab/frontend/abstract/core'
import { IElementTypeDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { IElementTypeKind } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
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
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ElementType) {
      throw new Error('Invalid ElementType')
    }

    this.elementKind = fragment.elementKind

    return this
  }

  @modelAction
  writeCache(elementTypeDTO: IElementTypeDTO) {
    updateBaseTypeCache(this, elementTypeDTO)

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
