import React from 'react'
import { treeSelectData } from './TreeSelect.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'TreeSelect',
}

export const Default = () => {
  const TreeSelect = TreeDom.render(treeSelectData)

  return <TreeSelect />
}
