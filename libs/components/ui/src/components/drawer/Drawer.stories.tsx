import React from 'react'
import { drawerData } from './Drawer.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Drawer',
}

export const Default = () => {
  const Drawer = TreeDom.render(drawerData)

  return <Drawer />
}
