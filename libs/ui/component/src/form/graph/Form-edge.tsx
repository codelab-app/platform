import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button } from 'antd'
import { JSONSchema7 } from 'json-schema'
import React from 'react'

const Form = withTheme(AntDTheme)

export const FormEdge = () => {
  const propsSchema: JSONSchema7 = {
    title: 'Props',
    type: 'object',
    properties: {
      props: { type: 'string', title: 'Additional prop', default: '' },
    },
  }

  const schema: JSONSchema7 = {
    title: 'Edge',
    type: 'object',
    required: ['source', 'target'],
    properties: {
      source: { type: 'string', title: 'source', default: '' },
      target: { type: 'string', title: 'target', default: '' },
      props: propsSchema,
    },
  }
  const log = (type: any) => console.log.bind(console, type)

  return (
    <Form schema={schema} onSubmit={log('submitted')} onError={log('errors')}>
      <Button type="primary">Submit</Button>
    </Form>
  )
}
