import React from 'react'
import { collapseData } from './Collapse.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Collapse',
  parameters: {
    data: {
      Default: collapseData,
    },
  },
}

export const Default = () => {
  const Collapse = Renderer.components(collapseData)

  return <Collapse />
}
