import React from 'react'
import { buttonData } from './Button.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Button',
}

export const Default = () => {
  const Button = Renderer.components(buttonData)

  return <Button />
}
