import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { popconfirmData } from './Popconfirm.data'

export default {
  title: 'Popconfirm',
}

export const Default = () => {
  const Popconfirm = TreeDom.render(popconfirmData)

  return <Popconfirm />
}
