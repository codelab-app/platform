import React from 'react'
import { inputNumberData } from './InputNumber.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'InputNumber',
}

export const Default = () => {
  const InputNumber = Renderer.components(inputNumberData)

  return <InputNumber />
}
