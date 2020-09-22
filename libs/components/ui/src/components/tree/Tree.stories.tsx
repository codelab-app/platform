import React from 'react'
import { treeData } from './Tree.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Tree',
}

export const Default = () => {
  const Tree = Renderer.components(treeData)

  return <Tree />
}
