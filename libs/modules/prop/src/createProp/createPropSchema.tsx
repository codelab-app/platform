import { getJsonSchemaTypeFromValueType } from '../getJsonSchemaTypeFromValueType'
import { PropTypeCollection__PropTypeFragment } from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'

/** Creates a JSON schema for a prop form dynamically, based on the attribute passed */
export const createPropSchema = (
  attribute: PropTypeCollection__PropTypeFragment,
): JSONSchemaType<Record<string, string | number | boolean>> => ({
  type: 'object',
  required: [],
  properties: {
    [attribute.key]: {
      type: getJsonSchemaTypeFromValueType(attribute.value_type),
    },
  },
})
