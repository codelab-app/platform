import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { buttonData } from './Button.data'

export default {
  title: 'Button',
}

export const Default = () => {
  const Button = TreeDom.render(buttonData)

  return <Button />
}
