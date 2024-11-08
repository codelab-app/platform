import type {
  ITypeModel,
  ITypeTransformContext,
  IUnionTypeModel,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type { IUnionTypeDto } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import { typeRef, userRef } from '@codelab/frontend/abstract/domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { makeAllTypes } from '@codelab/shared/domain-old'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { mergeDeep } from 'remeda'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ id, kind, name, owner, typesOfUnionType }: IUnionTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.UnionType)

  return new UnionType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
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

  @computed
  get toJson() {
    return {
      __typename: this.__typename,
      id: this.id,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
      typesOfUnionType: this.typesOfUnionType.map((type) => type.current),
    }
  }

  @modelAction
  writeCache(unionTypeDto: Partial<IUnionTypeDto>) {
    super.writeCache(unionTypeDto)

    this.typesOfUnionType =
      unionTypeDto.typesOfUnionType?.map((typeOfUnionType) =>
        typeRef(typeOfUnionType.id),
      ) ?? this.typesOfUnionType

    return this
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return {
      oneOf: this.typesOfUnionType.map((innerType) => {
        const typeSchema = innerType.current.toJsonSchema(context)

        return typeSchema.isTypedProp
          ? {
              ...typedPropSchema(innerType.current, context),
              typeName: innerType.current.name,
            }
          : mergeDeep(
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
}
