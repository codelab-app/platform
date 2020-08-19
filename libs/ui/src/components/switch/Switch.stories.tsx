import React from 'react'
import { switchData } from './Switch.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Switch',
}

export const Default = () => {
  const Switch = TreeDom.render(switchData)

  return <Switch />
}
