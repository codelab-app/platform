import React from 'react'
import { anchorData } from './Anchor.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Anchor',
  parameters: {
    data: {
      Default: anchorData,
    },
  },
}

export const Default = () => {
  const Anchor = Renderer.components(anchorData)

  return <Anchor />
}
