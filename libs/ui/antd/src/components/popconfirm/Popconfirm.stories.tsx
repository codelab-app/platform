import React from 'react'
import { popconfirmData } from './Popconfirm.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Popconfirm',
  parameters: {
    data: {
      Default: popconfirmData,
    },
  },
}

export const Default = () => {
  const Popconfirm = Renderer.components(popconfirmData)

  return <Popconfirm />
}
