import React from 'react'
import { badgeData } from './Badge.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Badge',
}

export const Default = () => {
  const Badge = Renderer.components(badgeData)

  return <Badge />
}
