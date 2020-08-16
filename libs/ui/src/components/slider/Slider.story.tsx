import React from 'react'
import { sliderData } from './Slider.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Slider',
}

export const Default = () => {
  const Slider = TreeDom.render(sliderData)

  return <Slider />
}
