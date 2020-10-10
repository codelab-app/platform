import React from 'react'
import { iconData } from './Icon.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Icon',
}

export const Default = () => {
  const Icon = Renderer.components(iconData)

  return <Icon />
}
