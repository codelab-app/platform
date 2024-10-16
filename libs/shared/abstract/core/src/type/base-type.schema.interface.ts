import type { JSONSchemaType } from 'ajv'

import { v4 } from 'uuid'

import type { IBaseTypeDto } from './base-type.dto.interface'
import type { ITypeKind } from './type-kind.enum'

export const BASE_TYPE_SCHEMA_REF = 'BASE_TYPE_SCHEMA'

export const baseTypeSchema = (
  type: ITypeKind,
): JSONSchemaType<IBaseTypeDto> => ({
  // title: type,
  properties: {
    __typename: {
      default: type,
      // const: type,
      type: 'string',
      'ui:widget': 'hidden',
    },
    id: {
      default: v4(),
      type: 'string',
      'ui:widget': 'hidden',
    },
    kind: {
      default: type,
      // const: type,
      type: 'string',
      'ui:widget': 'hidden',
    },
    name: {
      type: 'string',
    },
  },
  required: ['__typename', 'id', 'kind', 'name'],
  // $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
})

// export const baseTypeSchema: JSONSchemaType<IBaseTypeDto> = {
//   $id: BASE_TYPE_SCHEMA_REF,
//   // $schema: 'http://json-schema.org/draft-07/schema#',
//   type: 'object',
//   // title: type,
//   properties: {
//     __typename: {
//       type: 'string',
//       enum: Object.values(ITypeKind),
//       // default: type,
//       'ui:widget': 'hidden',
//     },
//     id: {
//       type: 'string',
//       default: v4(),
//       'ui:widget': 'hidden',
//     },
//     kind: {
//       type: 'string',
//       enum: Object.values(ITypeKind),
//       'ui:widget': 'hidden',
//     },
//     name: {
//       type: 'string',
//     },
//   },
//   required: ['__typename', 'id', 'kind', 'name'],
// }

// ajvProvider.addSchema(baseTypeSchema)
