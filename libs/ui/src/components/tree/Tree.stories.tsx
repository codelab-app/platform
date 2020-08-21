import React from 'react'
import { treeData } from './Tree.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Tree',
}

export const Default = () => {
  const Tree = TreeDom.render(treeData)

  return <Tree />
}
