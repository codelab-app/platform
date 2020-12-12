import React from 'react'
import { treeSelectData } from './TreeSelect.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'TreeSelect',
  parameters: {
    data: {
      Default: treeSelectData,
    },
  },
}

export const Default = () => {
  const TreeSelect = Renderer.components(treeSelectData)

  return <TreeSelect />
}
