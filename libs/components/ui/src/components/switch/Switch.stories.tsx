import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { switchData } from './Switch.data'

export default {
  title: 'Switch',
}

export const Default = () => {
  const Switch = TreeDom.render(switchData)

  return <Switch />
}
