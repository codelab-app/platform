import type {
  IAnyType,
  ITypeDTO,
  IUnionType,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import {
  detach,
  ExtendedModel,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  typesOfUnionTypeIds,
  owner,
}: IUnionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.UnionType)

  return new UnionType({
    id,
    kind,
    name,
    typesOfUnionTypeIds,
    ownerId: owner?.id,
  })
}

@model('@codelab/UnionType')
export class UnionType
  extends ExtendedModel(createTypeBase(ITypeKind.UnionType), {
    typesOfUnionTypeIds: prop<string>(),
    // typesOfUnionType: prop<Array<Ref<IAnyType>>>(() => []),
  })
  implements IUnionType
{
  // @computed
  // get children(): Array<IElement> {
  //   const firstChild = this.firstChild

  //   if (!firstChild) {
  //     return []
  //   }

  //   const results = []
  //   let currentTraveledNode: Maybe<IElement> = firstChild

  //   // parent = el1 -> el2 -> el3 -> end
  //   // given el1, travel next using next sibling until next = no more next sibling
  //   while (currentTraveledNode) {
  //     results.push(currentTraveledNode)
  //     currentTraveledNode = currentTraveledNode.nextSibling
  //   }

  //   return results
  // }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.UnionType) {
      throw new Error('Invalid UnionType')
    }

    this.typesOfUnionTypeIds = fragment.typesOfUnionTypeIds

    return this
  }

  public static hydrate = hydrate
}

export const typeRef = rootRef<IAnyType>('@codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
