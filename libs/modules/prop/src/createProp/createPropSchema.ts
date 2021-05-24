import { JSONSchemaType } from 'ajv'
// import { PropTypeCollection__PropTypeFragment } from '@codelab/hasura'
// import { JSONSchemaType } from 'ajv'
// import { getJsonSchemaTypeFromValueType } from '../getJsonSchemaTypeFromValueType'

export type CreatePropInput = {
  key: string
  description: string
  component: string
  type: string
  default: string
}

export const createPropSchema: JSONSchemaType<CreatePropInput> = {
  title: 'Create Prop Input',
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    component: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    default: {
      type: 'string',
    },
  },
  required: ['key', 'component', 'type'],
} as const

/** Creates a JSON schema for a prop form dynamically, based on the attribute passed */
// export const createPropSchema = (
//   attribute: PropTypeCollection__PropTypeFragment,
// ): JSONSchemaType<Record<string, string | number | boolean>> => ({
//   type: 'object',
//   required: [],
//   properties: {
//     [attribute.key]: {
//       type: getJsonSchemaTypeFromValueType(attribute.value_type),
//     },
//   },
// })
