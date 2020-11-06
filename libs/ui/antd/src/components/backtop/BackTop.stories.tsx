import React from 'react'
import { backtopData } from './BackTop.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'BackTop',
  parameters: {
    data: {
      Default: backtopData,
    },
  },
}

export const Default = () => {
  const BackTop = Renderer.components(backtopData)

  return <BackTop />
}
