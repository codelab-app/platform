import React from 'react'
import { inputNumberData } from './InputNumber.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'InputNumber',
  parameters: {
    data: {
      Default: inputNumberData,
    },
  },
}

export const Default = () => {
  const InputNumber = Renderer.components(inputNumberData)

  return <InputNumber />
}
