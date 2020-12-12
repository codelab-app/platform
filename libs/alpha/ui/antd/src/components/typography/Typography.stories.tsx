import React from 'react'
import { typographyData } from './Typography.data'
import { Renderer } from '@codelab/alpha/core/renderer'

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
