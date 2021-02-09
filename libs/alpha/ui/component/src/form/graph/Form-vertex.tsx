import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { SelectWidget } from './SelectWidget'
import { VertexType } from '@codelab/alpha/shared/interface/graph'
import { Button } from '@codelab/alpha/ui/antd'

const Form = withTheme(AntDTheme)

// Array version
// Solution:
// 1. use array for props
// 2. use mutation of formContext to pass already specified props down
// 3. use custom SelectWidget to filter option
export const FormVertex = () => {
  const propsSchema: JSONSchema7 = {
    title: 'Props',
    type: 'object',
    properties: {
      props: { type: 'string', title: 'Additional prop', default: '' },
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
        enum: Object.keys(VertexType),
      },
      // props: propsSchema,
    },
    dependencies: {
      type: {
        oneOf: [
          {
            properties: {
              type: {
                enum: [VertexType.REACT_BUTTON],
              },
              props: {
                type: 'array',
                title: 'Props',
                additionalItems: {
                  type: 'boolean',
                },
                uniqueItems: true,
                items: {
                  type: 'object',
                  properties: {
                    key: {
                      enum: [...Button.propKeys],
                    },
                    value: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  }
  const uiSchema = {}

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

  const widgets = {
    SelectWidget,
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      widgets={widgets}
      formContext={formCtx}
      onChange={filterOptions}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  )
}
