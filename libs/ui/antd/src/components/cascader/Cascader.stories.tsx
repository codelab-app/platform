import React from 'react'
import { cascaderData } from './Cascader.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Cascader',
  parameters: {
    data: {
      Default: cascaderData,
    },
  },
}

export const Default = () => {
  const Cascader = Renderer.components(cascaderData)

  return <Cascader />
}
