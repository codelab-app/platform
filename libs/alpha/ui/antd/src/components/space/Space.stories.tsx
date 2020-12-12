import React from 'react'
import { spaceData } from './Space.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Space',
  parameters: {
    data: {
      Default: spaceData,
    },
  },
}

export const Default = () => {
  const Space = Renderer.components(spaceData)

  return <Space />
}
