import React from 'react'
import { JsonSchemaForm } from '@codelab/frontend'
import { CreateStyleInputSchema } from '@codelab/generated'
import { CreateStyleInput } from 'libs/modules/style/src/core/application/useCases/createStyle/CreateStyleInput'

export default {
  title: 'FormJson',
  // parameters: {
  //   data: {},
  // },
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
