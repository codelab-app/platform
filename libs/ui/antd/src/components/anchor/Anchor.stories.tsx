import React from 'react'
import { anchorData } from './Anchor.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Anchor',
}

export const Default = () => {
  const Anchor = Renderer.components(anchorData)

  return <Anchor />
}
