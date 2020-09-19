import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { carouselData } from './Carousel.data'

export default {
  title: 'Carousel',
}

export const Default = () => {
  const Carousel = TreeDom.render(carouselData)

  return <Carousel />
}
