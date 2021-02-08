import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button } from 'antd'
import { JSONSchema6 } from 'json-schema'
import React from 'react'

const Form = withTheme(AntDTheme)

export const FormGraph = () => {
  const schema: JSONSchema6 = {
    type: 'object',
    required: ['label'],
    properties: {
      label: { type: 'string', title: 'label', default: '' },
    },
  }
  const log = (type: any) => console.log.bind(console, type)

  return (
    <Form
      schema={schema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    >
      <Button type="primary">Submit</Button>
    </Form>
  )
}
