import type {
  ITypeModel,
  ITypeTransformContext,
  IUnionTypeModel,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'
import type { IUnionTypeDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import { PropKind, typeRef, userRef } from '@codelab/frontend-abstract-domain'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { HiddenField, SelectField } from 'uniforms-antd'

import { typedPropSchema } from '../shared'
import { createBaseType } from './base-type.model'
import { titleCase } from '@codelab/shared-utils'

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
        const typedSchema = typedPropSchema(type.current, context)
        const valueSchema = typedSchema.properties?.value

        return valueSchema && valueSchema.uniforms
          ? {
              [type.current.kind]: {
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
      label: titleCase(context.fieldName ? context.fieldName : this.name),
      properties: {
        kind: {
          default: firstType.kind,
          enum: this.typesOfUnionType.map((type) => type.current.kind),
          type: 'string',
          uniforms: { component: HiddenField },
        },
        propKind: {
          default: PropKind.UnionTypeProp,
          enum: [PropKind.UnionTypeProp],
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
