import React from 'react'
import { sliderData } from './Slider.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Slider',
  parameters: {
    data: {
      Default: sliderData,
    },
  },
}

export const Default = () => {
  const Slider = Renderer.components(sliderData)

  return <Slider />
}
