import React from 'react'
import { treeData } from './Tree.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Tree',
  parameters: {
    data: {
      Default: treeData,
    },
  },
}

export const Default = () => {
  const Tree = Renderer.components(treeData)

  return <Tree />
}
