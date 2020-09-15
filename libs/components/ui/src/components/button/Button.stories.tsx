import React from 'react'
import { buttonData } from './Button.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Button',
}

export const Default = () => {
  const Button = TreeDom.render(buttonData)

  return <Button />
}
