import React from 'react'
import { sliderData } from './Slider.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Slider',
}

export const Default = () => {
  const Slider = TreeDom.render(sliderData)

  return <Slider />
}
