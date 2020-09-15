import React from 'react'
import { switchData } from './Switch.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Switch',
}

export const Default = () => {
  const Switch = TreeDom.render(switchData)

  return <Switch />
}
