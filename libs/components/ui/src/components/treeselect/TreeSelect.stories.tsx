import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { treeSelectData } from './TreeSelect.data'

export default {
  title: 'TreeSelect',
}

export const Default = () => {
  const TreeSelect = TreeDom.render(treeSelectData)

  return <TreeSelect />
}
