import React from 'react'
import { popoverData } from './Popover.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Popover',
}

export const Default = () => {
  const Popover = TreeDom.render(popoverData)

  return <Popover />
}
