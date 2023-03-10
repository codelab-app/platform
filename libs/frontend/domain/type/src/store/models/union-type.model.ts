import type { IAnyType, IUnionType } from '@codelab/frontend/abstract/core'
import { ITypeDTO, IUnionTypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { makeAllTypes } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
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
    owner,
    typesOfUnionType: typesOfUnionType.map((typeOfUnionType) =>
      typeRef(typeOfUnionType.id),
    ),
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

  @modelAction
  writeCache(unionTypeDTO: IUnionTypeDTO) {
    updateBaseTypeCache(this, unionTypeDTO)

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      typesOfUnionType: makeAllTypes({
        connect: this.typesOfUnionType.map(({ id }) => ({
          where: { node: { id } },
        })),
      }),
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      disconnect: {
        typesOfUnionType: makeAllTypes({
          where: {
            node: { id_NOT_IN: this.typesOfUnionType.map(({ id }) => id) },
          },
        }),
      },
      update: {
        typesOfUnionType: makeAllTypes({
          connect: this.typesOfUnionType.map(({ id }) => ({
            where: { node: { id } },
          })),
        }),
      },
    })
  }
}

export const typeRef = rootRef<IAnyType>('@codelab/TypeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
