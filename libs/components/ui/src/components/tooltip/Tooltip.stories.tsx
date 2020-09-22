import React from 'react'
import { tooltipData } from './Tooltip.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Tooltip',
}

export const Default = () => {
  const Tooltip = Renderer.components(tooltipData)

  return <Tooltip />
}
