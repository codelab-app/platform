import React from 'react'
import { popoverData } from './Popover.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Popover',
}

export const Default = () => {
  const Popover = TreeDom.render(popoverData)

  return <Popover />
}
