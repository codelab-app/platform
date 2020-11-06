import React from 'react'
import { typographyData } from './Typography.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Typography',
  parameters: {
    data: {
      Default: typographyData,
    },
  },
}

export const Default = () => {
  const Typography = Renderer.components(typographyData)

  return <Typography />
}
