import React from 'react'
import { menuData } from './Menu.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Menu',
}

export const Default = () => {
  const Menu = TreeDom.render(menuData)

  return <Menu />
}
