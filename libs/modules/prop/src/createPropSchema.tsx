import React from 'react'
import { JSONSchemaType } from 'ajv/lib/types/json-schema'
import { getJsonSchemaTypeFromAttributeType } from './getJsonSchemaTypeFromAttributeType'
import { PageElementProps__AttributeFragment } from '@codelab/hasura'

/** Creates a JSON schema for a prop form dynamically, based on the attribute passed */
export const createPropSchema = (
  attribute: PageElementProps__AttributeFragment,
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
