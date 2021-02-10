import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { UpdateVertexInputSchema } from '@codelab/generated'

const Form = withTheme(AntDTheme)

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    props: {
      $ref: '#/definitions/Props',
    },
  },
  definitions: {
    Props: {
      oneOf: [
        {
          type: 'object',
          title: 'RGL Item',
          properties: {
            block: {
              type: 'boolean',
            },
            disabled: {
              type: 'boolean',
            },
            type: {
              type: 'string',
              enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
            },
          },
        },
      ],
    },
  },
}

const OneOf = () => {
  return (
    <Form
      schema={UpdateVertexInputSchema}
      onSubmit={(e) => {
        console.log(e)
      }}
    />
  )
}

export default OneOf
