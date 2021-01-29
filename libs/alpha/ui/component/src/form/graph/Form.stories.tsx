import React from 'react'
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
