import { ElementTypeKind, PrimitiveKind } from '@codelab/shared/enums'
import { EnumTypeValueFragment } from '../graphql/EnumTypeValue.fragment.api.graphql.gen'

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveKind
  elementKind: ElementTypeKind
  allowedValues?: Array<EnumTypeValueFragment>
}

export const baseTypeMutationSchemaProperties = {
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
