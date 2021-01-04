import React from 'react'
import { carouselData } from './Carousel.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Carousel',
  parameters: {
    data: {
      Default: carouselData,
    },
  },
}

export const Default = () => {
  const Carousel = Renderer.components(carouselData)

  return <Carousel />
}
