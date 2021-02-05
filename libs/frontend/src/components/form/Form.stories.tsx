import { JSONSchema7 } from 'json-schema'
import { merge } from 'lodash'
import React from 'react'
import { JsonSchemaForm } from './json-schema'
import {
  ReactGridItemSchema,
  UpdateVertexInputSchema,
} from '@codelab/generated'

export const DemoJsonSchemaForm = () => {
  const schema: JSONSchema7 = {
    ...merge(UpdateVertexInputSchema, {
      properties: {
        ...ReactGridItemSchema.properties,
      },
    }),
  }

  return (
    <JsonSchemaForm
      schema={schema}
      initialFormData={{ vertexId: 'vertex-id' }}
      onSubmit={(e) => console.log(e)}
    />
  )
}
