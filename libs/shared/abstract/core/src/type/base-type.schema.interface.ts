import type { JSONSchemaType } from 'ajv'
import { v4 } from 'uuid'
import type { IBaseTypeDTO } from './base-type.dto.interface'
import type { ITypeKind } from './type-kind.enum'

export const baseTypeSchema = (
  type: ITypeKind,
): JSONSchemaType<IBaseTypeDTO> => ({
  // $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  // title: type,
  properties: {
    __typename: {
      const: type,
      type: 'string',
      default: type,
      'ui:widget': 'hidden',
    },
    id: {
      type: 'string',
      default: v4(),
      'ui:widget': 'hidden',
    },
    kind: {
      const: type,
      type: 'string',
      default: type,
      'ui:widget': 'hidden',
    },
    name: {
      type: 'string',
    },
  },
  required: ['__typename', 'id', 'kind', 'name'],
})
