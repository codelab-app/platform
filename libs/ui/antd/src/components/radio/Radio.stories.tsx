import React from 'react'
import { radioData } from './Radio.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Radio',
  parameters: {
    data: {
      Default: radioData,
    },
  },
}

export const Default = () => {
  const Radio = Renderer.components(radioData)

  return <Radio />
}
