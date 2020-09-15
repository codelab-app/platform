import React from 'react'
import { treeSelectData } from './TreeSelect.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'TreeSelect',
}

export const Default = () => {
  const TreeSelect = TreeDom.render(treeSelectData)

  return <TreeSelect />
}
