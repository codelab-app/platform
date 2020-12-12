import React from 'react'
import { listData } from './List.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'List',
  parameters: {
    data: {
      Default: listData,
    },
  },
}

export const Default = () => {
  const List = Renderer.components(listData)

  return <List />
}
