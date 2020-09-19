import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { popoverData } from './Popover.data'

export default {
  title: 'Popover',
}

export const Default = () => {
  const Popover = TreeDom.render(popoverData)

  return <Popover />
}
