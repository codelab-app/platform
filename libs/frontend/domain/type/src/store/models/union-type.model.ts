import type {
  IAnyType,
  ITypeDTO,
  IUnionType,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'
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
  typesOfUnionType,
  owner,
}: IUnionTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.UnionType)

  return new UnionType({
    id,
    kind,
    name,
    typesOfUnionType: typesOfUnionType.map((t) => typeRef(t.id)),
    ownerId: owner?.id,
  })
}

@model('@codelab/UnionType')
export class UnionType
  extends ExtendedModel(createTypeBase(ITypeKind.UnionType), {
    typesOfUnionType: prop<Array<Ref<IAnyType>>>(() => []),
  })
  implements IUnionType
{
  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.UnionType) {
      throw new Error('Invalid UnionType')
    }

    this.typesOfUnionType = fragment.typesOfUnionType.map((t) => typeRef(t.id))

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
