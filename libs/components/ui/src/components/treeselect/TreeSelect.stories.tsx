import React from 'react'
import { treeSelectData } from './TreeSelect.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'TreeSelect',
}

export const Default = () => {
  const TreeSelect = Renderer.components(treeSelectData)

  return <TreeSelect />
}
