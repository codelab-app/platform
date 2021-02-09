import React from 'react'
import { JsonSchemaForm } from './json-schema'
import { UpdateVertexInputSchema } from '@codelab/generated'
// import {
//   ReactGridItemSchema,
//   UpdateVertexInputSchema,
// } from '@codelab/generated'

export default {
  title: 'Form',
}

export const DemoJsonSchemaForm = () => {
  // const schema: JSONSchema7 = {
  //   ...merge(UpdateVertexInputSchema, {
  //     properties: {
  //       ...ReactGridItemSchema.properties,
  //     },
  //   }),
  // }

  return (
    <JsonSchemaForm
      schema={UpdateVertexInputSchema}
      initialFormData={{ vertexId: 'vertex-id' }}
      onSubmit={(e) => console.log(e)}
    />
  )
}
