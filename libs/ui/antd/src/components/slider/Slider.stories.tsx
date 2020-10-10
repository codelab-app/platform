import React from 'react'
import { sliderData } from './Slider.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Slider',
}

export const Default = () => {
  const Slider = Renderer.components(sliderData)

  return <Slider />
}
