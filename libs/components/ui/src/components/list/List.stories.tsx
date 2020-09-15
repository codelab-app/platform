import React from 'react'
import { listData } from './List.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'List',
}

export const Default = () => {
  const List = TreeDom.render(listData)

  return <List />
}
