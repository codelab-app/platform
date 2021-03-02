import React from 'react'
import { CodelabFieldTemplate } from './rjsf-templates/CodelabFieldTemplate'
import { CodelabCheckboxWidget } from './rjsf-widgets/CodelabCheckboxWidget'
import { CodelabTextWidget } from './rjsf-widgets/CodelabTextWidget'
import { JsonSchemaForm, OnSubmitEvent } from '@codelab/frontend'
import { UpdateVertexInput, UpdateVertexInputSchema } from '@codelab/generated'
import { ISubmitEvent, withTheme } from '@rjsf/core'
import { Theme as AntDTheme } from '@rjsf/antd'
import { VertexType } from '@prisma/client'

const Form = withTheme(AntDTheme)

const uiSchema = {
  props: {
    props: {
      loading: {
        'ui:widget': CodelabTextWidget,
      },
    },
  },
}

export const conditionalFormProps = {
  schema: UpdateVertexInputSchema,
  uiSchema,
}

export const ConditionalForm = () => {
  const formCtx = {
    specifiedPropsKeys: [],
  }

  const log = (type: any) => console.log.bind(console, type)

  const filterOptions = ({ formData }: any, e: any) => {
    if (Array.isArray(formData.props)) {
      formCtx.specifiedPropsKeys = formData?.props.map((p: any) => p.key)
      console.log(formData, e)
    }
  }

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

  const onSubmitClicked = ({ formData }: OnSubmitEvent) =>
    console.log('Form Data: ', formData)
    // console.log('Transformed: ', transformFromData(formData))

  const widgets = {
    TextWidget: CodelabTextWidget,
    CheckboxWidget: CodelabCheckboxWidget,
    // SelectWidget: CodelabSelectWidget
  }

  const initialFormData = {
    vertexId: 'asdf',
    type: VertexType.React_Button
  }

  return (
      <Form schema={conditionalFormProps.schema}
            uiSchema={conditionalFormProps.uiSchema}
            formData={initialFormData}
            onSubmit={onSubmitClicked}
      ></Form>
  )

  // return (
  //   <JsonSchemaForm
  //     widgets={widgets}
  //     initialFormData={initialFormData}
  //     FieldTemplate={CodelabFieldTemplate}
  //     onChange={filterOptions}
  //     onSubmit={onSubmitClicked}
  //     onError={log('errors')}
  //     {...conditionalFormProps}
  //   />
  // )
}
