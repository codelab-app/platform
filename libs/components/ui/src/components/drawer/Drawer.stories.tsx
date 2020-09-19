import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { drawerData } from './Drawer.data'

export default {
  title: 'Drawer',
}

export const Default = () => {
  const Drawer = TreeDom.render(drawerData)

  return <Drawer />
}
