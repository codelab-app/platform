import React from 'react'
import { descriptionsData } from './Descriptions.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Descriptions',
}

export const Default = () => {
  const Descriptions = Renderer.components(descriptionsData)

  return <Descriptions />
}
