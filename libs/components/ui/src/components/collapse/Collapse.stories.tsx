import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { collapseData } from './Collapse.data'

export default {
  title: 'Collapse',
}

export const Default = () => {
  const Collapse = TreeDom.render(collapseData)

  return <Collapse />
}
