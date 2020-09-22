import React from 'react'
import { spaceData } from './Space.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Space',
}

export const Default = () => {
  const Space = Renderer.components(spaceData)

  return <Space />
}
