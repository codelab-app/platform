import React from 'react'
import { popconfirmData } from './Popconfirm.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Popconfirm',
}

export const Default = () => {
  const Popconfirm = TreeDom.render(popconfirmData)

  return <Popconfirm />
}
