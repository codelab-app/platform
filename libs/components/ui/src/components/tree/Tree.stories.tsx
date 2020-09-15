import React from 'react'
import { treeData } from './Tree.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Tree',
}

export const Default = () => {
  const Tree = TreeDom.render(treeData)

  return <Tree />
}
