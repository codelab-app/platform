import type { IType, IUnionType } from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/abstract/core'
import type { IUnionTypeDTO } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { makeAllTypes } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner, typesOfUnionType }: IUnionTypeDTO) => {
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
    typesOfUnionType: prop<Array<Ref<IType>>>(() => []),
  })
  implements IUnionType
{
  @modelAction
  writeCache(unionTypeDTO: Partial<IUnionTypeDTO>) {
    super.writeCache(unionTypeDTO)

    this.typesOfUnionType =
      unionTypeDTO.typesOfUnionType?.map((typeOfUnionType) =>
        typeRef(typeOfUnionType.id),
      ) ?? this.typesOfUnionType

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

  public static create = create
}
