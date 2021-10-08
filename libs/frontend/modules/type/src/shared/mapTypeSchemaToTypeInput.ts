import { ElementTypeKind, PrimitiveKind } from '@codelab/shared/abstract/core'
import { EnumTypeValueFragment } from '../graphql/EnumTypeValue.fragment.graphql.gen'
import { TypeSelect } from './TypeSelect'

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveKind
  elementKind: ElementTypeKind
  allowedValues?: Array<EnumTypeValueFragment>
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
      // properties: {
      //   label: {
      //     type: 'string',
      //     nullable: true,
      //   },
      //   value: { type: 'string' },
      // },
      // required: ['value'],
    },
    abc: 'test',
    uniforms: { component: TypeSelect, isUnionTypeInput: true },
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
  // TODON
  /**
   * array
   * nullable
   * items:
   * id:
   * disallow update kind...
   * copy properties
   * typesOfUnionType
   *           type: 'string',
          nullable: true,
          uniforms: {
            component: () => null,
          },
          only editable in create ..
          component
   * bellow
   */

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
