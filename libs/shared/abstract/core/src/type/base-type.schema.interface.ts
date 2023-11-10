import type { JSONSchemaType } from 'ajv'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export const baseTypeSchema = (
  type: ITypeKind,
): JSONSchemaType<IBaseTypeDTO> => ({
  // $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  title: type,
  properties: {
    __typename: {
      const: type,
      type: 'string',
      default: type,
    },
    id: {
      type: 'string',
    },
    kind: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: ['__typename', 'id', 'kind', 'name'],
})
