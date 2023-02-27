import type {
  IAnyType,
  IUnionType,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  ExtendedModel,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrate = ({
  id,
  kind,
  name,
  typesOfUnionType,
  owner,
}: IUnionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.UnionType)

  return new UnionType({
    id,
    kind,
    name,
    typesOfUnionType: typesOfUnionType.map((typeOfUnionType) =>
      typeRef(typeOfUnionType.id),
    ),
    owner,
  })
}

@model('@codelab/UnionType')
export class UnionType
  extends ExtendedModel(createBaseType(ITypeKind.UnionType), {
    typesOfUnionType: prop<Array<Ref<IAnyType>>>(() => []),
  })
  implements IUnionType
{
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.UnionType) {
      throw new Error('Invalid UnionType')
    }

    this.typesOfUnionType = fragment.typesOfUnionType.map((typeOfUnionType) =>
      typeRef(typeOfUnionType.id),
    )

    return this
  }

  public static hydrate = hydrate
}

export const typeRef = rootRef<IAnyType>('@codelab/TypeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
