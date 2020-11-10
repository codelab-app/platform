import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { VertexType } from '@codelab/shared/interface/graph'

const Form = withTheme(AntDTheme)

export const FormVertex = () => {
  const propsSchema: JSONSchema7 = {
    title: 'Props',
    type: 'object',
    additionalProperties: {
      type: 'string',
      // enum: [1, 2, 3],
    },
  }

  const schema: JSONSchema7 = {
    title: 'Vertex',
    type: 'object',
    required: ['type'],
    properties: {
      type: {
        type: 'string',
        title: 'Type',
        // default: '',
        enum: Object.keys(VertexType),
      },
      props: propsSchema,
    },
  }
  const log = (type: any) => console.log.bind(console, type)

  const uiSchema = {
    // 'ui:options': {
    //   expandable: false,
    // },
  }

  return (
    <Form
      uiSchema={uiSchema}
      schema={schema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  )
}
