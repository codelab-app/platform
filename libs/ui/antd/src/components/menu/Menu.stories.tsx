import React from 'react'
import { menuData } from './Menu.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Menu',
  parameters: {
    data: {
      Default: menuData,
    },
  },
}

export const Default = () => {
  const Menu = Renderer.components(menuData)

  return <Menu />
}
