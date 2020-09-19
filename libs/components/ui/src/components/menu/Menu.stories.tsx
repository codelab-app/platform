import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { menuData } from './Menu.data'

export default {
  title: 'Menu',
}

export const Default = () => {
  const Menu = TreeDom.render(menuData)

  return <Menu />
}
