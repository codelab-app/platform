import React from 'react'
import { cardData } from './Card.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Card',
}

export const Default = () => {
  const Card = TreeDom.render(cardData)

  return <Card />
}
