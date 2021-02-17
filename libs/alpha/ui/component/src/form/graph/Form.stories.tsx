import React from 'react'
import { UpdateVertexInputSchema } from '../../../../../../generated/src'
import { FormEdge } from './Form-edge'
import { FormGraph } from './Form-graph'
import { FormGraphVertices } from './Form-graph--vertices'
import { FormVertexConditional } from './Form-vertex-conditional'
import { FormVertex as FormVertexV2 } from './Form-vertex-v2'

export default {
  title: 'FormJson',
  parameters: {
    data: {
      VertexFormConditional: UpdateVertexInputSchema,
    },
  },
}

export const VertexFormConditional = () => {
  return <FormVertexConditional />
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
