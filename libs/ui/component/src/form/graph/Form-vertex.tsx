import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button } from 'antd'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { VertexType } from '@codelab/shared/interface/graph'

const Form = withTheme(AntDTheme)

export const FormVertex = () => {
  const propsSchema: JSONSchema7 = {
    type: 'string',
  }

  const schema: JSONSchema7 = {
    title: 'Vertex',
    type: 'object',
    required: ['type'],
    properties: {
      type: {
        type: 'string',
        title: 'Type',
        enum: Object.keys(VertexType),
      },
    },
    additionalProperties: propsSchema,
  }
  const log = (type: any) => console.log.bind(console, type)

  return (
    <Form schema={schema} onSubmit={log('submitted')} onError={log('errors')}>
      <Button type="primary">Submit</Button>
    </Form>
  )
}
