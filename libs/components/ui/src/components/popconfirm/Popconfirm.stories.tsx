import React from 'react'
import { popconfirmData } from './Popconfirm.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Popconfirm',
}

export const Default = () => {
  const Popconfirm = TreeDom.render(popconfirmData)

  return <Popconfirm />
}
