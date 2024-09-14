import type {
  ITypeModel,
  ITypeTransformContext,
  IUnionTypeModel,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import type { IUnionTypeDto } from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { makeAllTypes } from '@codelab/shared/domain'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { mergeDeep } from 'remeda'
import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, typesOfUnionType }: IUnionTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.UnionType)

  return new UnionType({
    id,
    kind,
    name,
    typesOfUnionType: typesOfUnionType.map((typeOfUnionType) =>
      typeRef(typeOfUnionType.id),
    ),
  })
}

@model('@codelab/UnionType')
export class UnionType
  extends ExtendedModel(createBaseType(ITypeKind.UnionType), {
    typesOfUnionType: prop<Array<Ref<ITypeModel>>>(() => []),
  })
  implements IUnionTypeModel
{
  public static create = create

  @modelAction
  writeCache(unionTypeDto: Partial<IUnionTypeDto>) {
    super.writeCache(unionTypeDto)

    this.typesOfUnionType =
      unionTypeDto.typesOfUnionType?.map((typeOfUnionType) =>
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

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return {
      oneOf: this.typesOfUnionType.map((innerType) => {
        const typeSchema = innerType.current.toJsonSchema(context)

        return mergeDeep(
          {
            ...typedPropSchema(innerType.current, {}),
            typeName: innerType.current.name,
          },
          { properties: { value: typeSchema } },
        )
      }),
      ...(context.uniformSchema?.(this) ?? {}),
    }
  }

  toUpdateInput() {
    return mergeDeep(
      {
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
      },
      super.toUpdateInput(),
    )
  }
}
