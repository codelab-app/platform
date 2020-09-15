import React from 'react'
import { emptyData } from './Empty.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Empty',
}

export const Default = () => {
  const Empty = TreeDom.render(emptyData)

  return <Empty />
}
