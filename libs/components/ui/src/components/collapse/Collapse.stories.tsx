import React from 'react'
import { collapseData } from './Collapse.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Collapse',
}

export const Default = () => {
  const Collapse = TreeDom.render(collapseData)

  return <Collapse />
}
