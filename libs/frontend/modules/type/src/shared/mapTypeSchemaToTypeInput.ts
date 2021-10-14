import { ElementTypeKind, PrimitiveKind } from '@codelab/shared/abstract/core'
import { EnumTypeValueFragment } from '../graphql/EnumTypeValue.fragment.graphql.gen'
import { TypeSelect } from './TypeSelect'
import { TagSelect } from '@codelab/frontend/modules/tag'

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveKind
  elementKind: ElementTypeKind
  allowedValues?: Array<EnumTypeValueFragment>
  tagIds?: Array<string>
  typeIdsOfUnionType?: Array<string>
}

export const baseTypeMutationSchemaProperties = {
  typeIdsOfUnionType: {
    type: 'array',
    nullable: true,
    label: 'Types',
    isUnionTypeInput: true,
    items: {
      type: 'string',
      isUnionTypeInput: true,
    },
    uniforms: { component: TypeSelect, isUnionTypeInput: true },
  },
  tagIds: {
    type: 'array',
    nullable: true,
    label: 'Tags',
    items: {
      type: 'string',
    },
    uniforms: { component: TagSelect },
  },
  name: {
    type: 'string',
  },
  primitiveKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(PrimitiveKind),
  },
  elementKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(ElementTypeKind),
  },
  allowedValues: {
    type: 'array',
    nullable: true,
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: () => null,
          },
        },
        name: { type: 'string', nullable: true },
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
}
