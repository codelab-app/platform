import React from 'react'
import { carouselData } from './Carousel.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Carousel',
}

export const Default = () => {
  const Carousel = TreeDom.render(carouselData)

  return <Carousel />
}
