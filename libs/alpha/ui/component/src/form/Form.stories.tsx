import React from 'react'
import { FormVertexConditional } from './graph/Form-vertex-conditional'
import { JsonSchemaForm } from '@codelab/frontend'
import {
  CreateStyleInputSchema,
  UpdateVertexInputSchema,
} from '@codelab/generated'
import { CreateStyleInput } from 'libs/modules/style/src/core/application/useCases/createStyle/CreateStyleInput'

export default {
  title: 'FormJson',
  parameters: {
    data: {
      VertexFormConditional: UpdateVertexInputSchema,
    },
  },
}

export const SelectableSearchArrayForm = () => {
  return (
    <JsonSchemaForm<CreateStyleInput>
      initialFormData={{}}
      schema={CreateStyleInputSchema}
      onSubmit={() => null}
    />
  )
}

export const ConditionalVertexForm = () => {
  return <FormVertexConditional />
}
