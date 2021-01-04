import React from 'react'
import { emptyData } from './Empty.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Empty',
  parameters: {
    data: {
      Default: emptyData,
    },
  },
}

export const Default = () => {
  const Empty = Renderer.components(emptyData)

  return <Empty />
}
