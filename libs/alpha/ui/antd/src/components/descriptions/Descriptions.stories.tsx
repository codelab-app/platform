import React from 'react'
import { descriptionsData } from './Descriptions.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Descriptions',
  parameters: {
    data: {
      Default: descriptionsData,
    },
  },
}

export const Default = () => {
  const Descriptions = Renderer.components(descriptionsData)

  return <Descriptions />
}
