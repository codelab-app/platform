import React from 'react'
import { popoverData } from './Popover.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Popover',
  parameters: {
    data: {
      Default: popoverData,
    },
  },
}

export const Default = () => {
  const Popover = Renderer.components(popoverData)

  return <Popover />
}
