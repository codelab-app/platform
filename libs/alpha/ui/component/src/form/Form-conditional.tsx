import { VertexType } from '@prisma/client'
import React from 'react'
import { CodelabFieldTemplate } from './rjsf-templates/CodelabFieldTemplate'
import { CodelabCheckboxWidget } from './rjsf-widgets/CodelabCheckboxWidget'
import { CodelabTextWidget } from './rjsf-widgets/CodelabTextWidget'
import { JsonSchemaForm, OnSubmitEvent } from '@codelab/frontend'
import { UpdateVertexInput, UpdateVertexInputSchema, UpdateVertexInputUiSchema } from '@codelab/generated'
import { withTheme } from '@rjsf/core'
import { Theme as AntDTheme } from '@rjsf/antd'
import { JSONSchema7 } from 'json-schema';

const Form = withTheme(AntDTheme)

export const conditionalFormProps = {
  schema: UpdateVertexInputSchema,
  uiSchema: UpdateVertexInputUiSchema
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

    // console.log('Transformed: ', transformFromData(formData))
  }

  const widgets = {
    TextWidget: CodelabTextWidget,
    CheckboxWidget: CodelabCheckboxWidget,
    // SelectWidget: CodelabSelectWidget
  }

  return (
      <Form schema={conditionalFormProps.schema as unknown as JSONSchema7}
            uiSchema={conditionalFormProps.uiSchema}
            FieldTemplate={CodelabFieldTemplate}
            onSubmit={onSubmitClicked}/>
  );

  // return (
  //   <JsonSchemaForm
  //     initialFormData={{
  //       type: VertexType.React_Button,
  //     }}
  //     // widgets={widgets}
  //     FieldTemplate={CodelabFieldTemplate}
  //     // onChange={filterOptions}
  //     onSubmit={onSubmitClicked}
  //     onError={log('errors')}
  //     {...conditionalFormProps}
  //   />
  // )
}
