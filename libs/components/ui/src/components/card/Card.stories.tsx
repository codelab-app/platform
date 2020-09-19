import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { cardData } from './Card.data'

export default {
  title: 'Card',
}

export const Default = () => {
  const Card = TreeDom.render(cardData)

  return <Card />
}
