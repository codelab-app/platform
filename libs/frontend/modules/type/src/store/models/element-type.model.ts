import type {
  IElementType,
  IElementTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import {
  assertIsTypeKind,
  ElementTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  elementKind,
  owner,
}: IElementTypeDTO): ElementType => {
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
    elementKind: prop<ElementTypeKind>(),
  })
  implements IElementType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.ElementType) {
      return
    }

    this.elementKind = fragment.elementKind
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  //
  //   if (!input.elementKind) {
  //     throw new Error('ElementType must have an elementKind')
  //   }
  //
  //   this.elementKind = input.elementKind
  // }

  public static hydrate = hydrate
}
