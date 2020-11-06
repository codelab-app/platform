import React from 'react'
import { drawerData } from './Drawer.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Drawer',
  parameters: {
    data: {
      Default: drawerData,
    },
  },
}

export const Default = () => {
  const Drawer = Renderer.components(drawerData)

  return <Drawer />
}
