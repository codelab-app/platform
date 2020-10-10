import React from 'react'
import { carouselData } from './Carousel.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Carousel',
}

export const Default = () => {
  const Carousel = Renderer.components(carouselData)

  return <Carousel />
}
