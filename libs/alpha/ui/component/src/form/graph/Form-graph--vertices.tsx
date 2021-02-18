import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button } from 'antd'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CodelabTextWidget } from './customWidgets/CodelabTextWidget'
// import  from "react-jsonschema-form/";

const Form = withTheme(AntDTheme)

export const FormGraphVertices = () => {
  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      vertexId: {
        type: 'string',
        description: 'Test',
      },
    },
  }
  const log = (type: any) => console.log.bind(console, type)

  const formData = {}

  const widgets = {
    TextWidget: CodelabTextWidget,
  }

  return (
    <Form
      formData={formData}
      schema={schema}
      widgets={widgets}
      // uiSchema={uiSchema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    >
      <Button type="primary">Submit</Button>
    </Form>
  )
}
