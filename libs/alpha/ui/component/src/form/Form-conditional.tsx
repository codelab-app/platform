import React from 'react'
import { CodelabFieldTemplate } from './rjsf-templates/CodelabFieldTemplate'
import { CodelabCheckboxWidget } from './rjsf-widgets/CodelabCheckboxWidget'
import { CodelabTextWidget } from './rjsf-widgets/CodelabTextWidget'
import { AtomType, JsonSchemaForm, OnSubmitEvent } from '@codelab/frontend'
import { UpdateVertexInput, UpdateVertexInputSchema } from '@codelab/generated'

export const conditionalFormProps = {
  schema: UpdateVertexInputSchema,
}

export const ConditionalForm = () => {
  const log = (type: any) => console.log.bind(console, type)

  const transformFromData = (formData: any) => {
    const { type } = formData.props
    const { props } = formData.props

    return {
      vertexId: formData.vertexId,
      type,
      props: {
        ...props,
      },
    } as UpdateVertexInput
  }

  const onSubmitClicked = ({ formData }: OnSubmitEvent) => {
    console.log(formData)

    console.log('Transformed: ', transformFromData(formData))
  }

  const widgets = {
    TextWidget: CodelabTextWidget,
    CheckboxWidget: CodelabCheckboxWidget,
    // SelectWidget: CodelabSelectWidget
  }

  return (
    <JsonSchemaForm
      initialFormData={{
        type: AtomType.ReactButton,
      }}
      // widgets={widgets}
      FieldTemplate={CodelabFieldTemplate}
      // onChange={filterOptions}
      onSubmit={onSubmitClicked}
      onError={log('errors')}
      {...conditionalFormProps}
    />
  )
}
