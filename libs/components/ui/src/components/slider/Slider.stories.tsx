import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { sliderData } from './Slider.data'

export default {
  title: 'Slider',
}

export const Default = () => {
  const Slider = TreeDom.render(sliderData)

  return <Slider />
}
