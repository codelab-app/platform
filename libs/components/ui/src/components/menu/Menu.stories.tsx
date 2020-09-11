import React from 'react'
import { menuData } from './Menu.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Menu',
}

export const Default = () => {
  const Menu = TreeDom.render(menuData)

  return <Menu />
}
