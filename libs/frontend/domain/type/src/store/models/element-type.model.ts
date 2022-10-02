import type {
  IElementType,
  IElementTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import {
  assertIsTypeKind,
  IElementTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({ id, kind, name, elementKind, owner }: IElementTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    id,
    kind,
    name,
    elementKind,
    ownerId: owner?.id,
  })
}

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(createTypeBase(ITypeKind.ElementType), {
    elementKind: prop<IElementTypeKind>(),
  })
  implements IElementType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ElementType) {
      throw new Error('Invalid ElementType')
    }

    this.elementKind = fragment.elementKind

    return this
  }

  public static hydrate = hydrate
}
