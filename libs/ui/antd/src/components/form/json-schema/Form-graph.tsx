import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'

const Form = withTheme(AntDTheme)

export const FormGraph = () => {
  const schema: JSONSchema7 = {
    title: 'Todo',
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title', default: 'A new task' },
      done: { type: 'boolean', title: 'Done?', default: false },
    },
  }
  const log = (type: any) => console.log.bind(console, type)

  return (
    <Form
      schema={schema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  )
}
