import React from 'react'
import { emptyData } from './Empty.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Empty',
}

export const Default = () => {
  const Empty = TreeDom.render(emptyData)

  return <Empty />
}
