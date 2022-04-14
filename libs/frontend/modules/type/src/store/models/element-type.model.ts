import {
  ElementTypeKind,
  IElementType,
  IElementTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateFromDTO } from '../abstract'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  typeKind,
  name,
  elementKind,
  owner,
}: IElementTypeDTO): ElementType =>
  new ElementType({
    id,
    typeKind,
    name,
    elementKind,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ElementType),
    props: {
      elementKind: prop<ElementTypeKind>(),
    },
  }))
  implements IElementType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateFromDTO(this, fragment)

    if (fragment.typeKind !== TypeKind.ElementType) {
      return
    }

    this.elementKind = fragment.elementKind
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)

    if (!input.elementKind) {
      throw new Error('ElementType must have an elementKind')
    }

    this.elementKind = input.elementKind
  }

  public static hydrate = hydrate
}
