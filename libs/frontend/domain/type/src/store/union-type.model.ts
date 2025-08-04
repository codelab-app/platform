import type {
  ITypeModel,
  ITypeTransformContext,
  IUnionTypeModel,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type { IUnionTypeDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import { typeRef, userRef } from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { unique } from 'radash'
import { HiddenField, SelectField } from 'uniforms-antd'

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

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    const uniformSchema = context.uniformSchema?.(this)

    const valueSchemas = this.typesOfUnionType
      .map((type) => {
        const typedSchema = type.current.toJsonSchema(context)
        const valueSchema = typedSchema.properties?.__isTypedProp
          ? typedSchema.properties.value
          : typedSchema

        return valueSchema
          ? {
              [type.current.id]: {
                ...(valueSchema as JsonSchema),
                label: '',
              },
            }
          : null
      })
      .reduce((all, current) => ({ ...all, ...current }), {})

    const firstType = this.typesOfUnionType[0]?.current

    if (!firstType) {
      throw new Error('UnionType must have at least one type')
    }

    return {
      properties: {
        __isTypedProp: {
          default: true,
          type: 'boolean',
          uniforms: { component: HiddenField },
        },
        kind: {
          default: firstType.kind,
          enum: unique(this.typesOfUnionType.map((type) => type.current.kind)),
          type: 'string',
          uniforms: { component: HiddenField },
        },
        type: {
          default: firstType.id,
          label: '',
          type: 'string',
          uniforms: {
            component: SelectField,
            options: this.typesOfUnionType.map((type) => ({
              label: type.current.name,
              value: type.current.id,
            })),
          },
        },

        ...valueSchemas,
      },
      required: ['kind', 'type'],
      type: 'object',
      ...context.validationRules,
      ...uniformSchema,
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
}
