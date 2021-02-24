import React from 'react'
import { CodelabSelectWidget } from './rjsf-widgets/CodelabSelectWidget'
import { JsonSchemaForm } from '@codelab/frontend'
import { CreateStyleInput, VegaSchema } from '@codelab/generated'

export const selectableSearchArrayFormProps = {
  schema: VegaSchema,
  widgets: {
    SelectWidget: CodelabSelectWidget,
  },
}

export const SelectableSearchArrayForm = () => {
  return (
    <JsonSchemaForm<CreateStyleInput> {...selectableSearchArrayFormProps} />
  )
}
