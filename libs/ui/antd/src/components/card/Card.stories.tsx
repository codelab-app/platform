import React from 'react'
import { cardData } from './Card.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Card',
  parameters: {
    data: {
      Default: cardData,
    },
  },
}

export const Default = () => {
  const Card = Renderer.components(cardData)

  return <Card />
}
