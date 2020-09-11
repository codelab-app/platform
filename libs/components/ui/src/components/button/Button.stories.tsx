import React from 'react'
import { buttonData } from './Button.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Button',
}

export const Default = () => {
  const Button = TreeDom.render(buttonData)

  return <Button />
}
