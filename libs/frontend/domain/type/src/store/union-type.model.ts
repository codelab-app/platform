import type {
  ITypeModel,
  ITypeTransformContext,
  IUnionTypeModel,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type { IUnionTypeDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import { typeRef, userRef } from '@codelab/frontend-abstract-domain'
import { ExpressionUnionField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { unique } from 'remeda'
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
    const kinds = unique(this.typesOfUnionType.map((type) => type.current.kind))
    const types = unique(this.typesOfUnionType.map((type) => type.current.id))
    const typeOptions = this.typesOfUnionType.map((type) => ({
      label: type.current.name,
      value: type.current.id,
    }))

    return {
      discriminator: {
        propertyName: 'type',
      },
      oneOf: this.typesOfUnionType.map((type) => {
        const typeSchema = type.current.toJsonSchema(context)
        const value = (
          typeSchema.properties?.__isTypedProp
            ? typeSchema.properties.value
            : typeSchema
        ) as JsonSchema

        return {
          properties: {
            __isTypedProp: {
              default: true,
              type: 'boolean',
              uniforms: { component: HiddenField },
            },
            kind: {
              default: type.current.kind,
              enum: kinds,
              type: 'string',
              uniforms: { component: HiddenField },
            },
            type: {
              const: type.id,
              default: type.id,
              enum: types,
              type: 'string',
              label: '',
              uniforms: {
                component: SelectField,
                options: typeOptions,
              },
            },
            value: {
              ...value,
              label: '',
            },
          },
        }
      }),
      required: ['__isTypedProp', 'kind', 'type'],
      type: 'object',
      uniforms: {
        component: ExpressionUnionField,
      },
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
