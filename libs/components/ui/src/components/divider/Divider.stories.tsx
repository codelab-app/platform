import React from 'react'
import { dividerData } from './Divider.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Divider',
}

export const Default = () => {
  const Divider = Renderer.components(dividerData)

  return <Divider />
}
