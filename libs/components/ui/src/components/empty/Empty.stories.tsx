import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { emptyData } from './Empty.data'

export default {
  title: 'Empty',
}

export const Default = () => {
  const Empty = TreeDom.render(emptyData)

  return <Empty />
}
