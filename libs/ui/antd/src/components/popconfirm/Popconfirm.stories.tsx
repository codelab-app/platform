import React from 'react'
import { popconfirmData } from './Popconfirm.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Popconfirm',
}

export const Default = () => {
  const Popconfirm = Renderer.components(popconfirmData)

  return <Popconfirm />
}
