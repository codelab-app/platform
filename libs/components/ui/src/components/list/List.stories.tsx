import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { listData } from './List.data'

export default {
  title: 'List',
}

export const Default = () => {
  const List = TreeDom.render(listData)

  return <List />
}
