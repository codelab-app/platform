import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { treeData } from './Tree.data'

export default {
  title: 'Tree',
}

export const Default = () => {
  const Tree = TreeDom.render(treeData)

  return <Tree />
}
