import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { requestJsonSchema } from '../../../../../../tools/json-schema-generator/src/generated/index'
import { FormEdge } from './Form-edge'
import { FormGraph } from './Form-graph'
import { FormGraphVertices } from './Form-graph--vertices'
import { FormVertex } from './Form-vertex'
import { FormVertex as FormVertexV2 } from './Form-vertex-v2'

export default {
  title: 'FormJson',
  parameters: {
    data: {},
  },
}

export const VertexForm = () => {
  return <FormVertex />
}

export const VertexV2Form = () => {
  return <FormVertexV2 />
}
export const EdgeForm = () => {
  return <FormEdge />
}

export const GraphForm = () => {
  return <FormGraph />
}

export const GraphVertexForm = () => {
  return <FormGraphVertices />
}

export const JsonSchemaForm = () => {
  const Form = withTheme(AntDTheme)

  return (
    <Form
      schema={requestJsonSchema.definitions.AddChildNodeRequest as JSONSchema7}
      // uiSchema={uiSchema}
      // widgets={widgets}
      // formContext={formCtx}
      // onChange={filterOptions}
      // onSubmit={log('submitted')}
      // onError={log('errors')}
    />
  )
}
