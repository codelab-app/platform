import { getJsonSchemaTypeFromAttributeType } from '../getAttributes/getJsonSchemaTypeFromAttributeType'
import { Prop__AttributeFragment } from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'

/** Creates a JSON schema for a prop form dynamically, based on the attribute passed */
export const createPropSchema = (
  attribute: Prop__AttributeFragment,
): JSONSchemaType<Record<string, string | number | boolean>> => ({
  type: 'object',
  required: [],
  properties: {
    [attribute.key]: {
      type: getJsonSchemaTypeFromAttributeType(
        attribute.valueType?.value as any,
      ),
    },
  },
})
