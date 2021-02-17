import { Theme as AntDTheme } from '@rjsf/antd'
import { ISubmitEvent, withTheme } from '@rjsf/core'
import React from 'react'
import { CodelabFieldTemplate } from './customTemplates/CodelabFieldTemplate'
import { CodelabCheckboxWidget } from './customWidgets/CodelabCheckboxWidget'
import { CodelabTextWidget } from './customWidgets/CodelabTextWidget'
import { UpdateVertexInput, UpdateVertexInputSchema } from '@codelab/generated'

const Form = withTheme(AntDTheme)

export const FormVertexConditional = () => {
  const schema = UpdateVertexInputSchema

  // const schema: JSONSchema7 = {
  //   type: 'string',
  //   description: 'Hello'
  // }

  console.log(schema)

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

  const onSubmitClicked = ({ formData }: ISubmitEvent<any>) =>
    console.log('Transformed: ', transformFromData(formData))
  // console.log('Data submitted: ', formData)

  const widgets = {
    TextWidget: CodelabTextWidget,
    CheckboxWidget: CodelabCheckboxWidget,
    // SelectWidget: CodelabSelectWidget
  }

  const uiSchema = {
    props: {
      props: {
        loading: {
          'ui:widget': CodelabTextWidget,
        },
      },
    },
  }

  return (
    <Form
      schema={schema}
      widgets={widgets}
      uiSchema={uiSchema}
      FieldTemplate={CodelabFieldTemplate}
      // validate={validate}
      // formContext={formCtx}
      onChange={filterOptions}
      onSubmit={onSubmitClicked}
      onError={log('errors')}
    />
  )
}
