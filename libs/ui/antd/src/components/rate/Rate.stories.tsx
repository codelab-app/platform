import React from 'react'
import { rateData } from './Rate.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Rate',
}

export const Default = () => {
  const Rate = Renderer.components(rateData)

  return <Rate />
}
