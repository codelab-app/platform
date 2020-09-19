import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { inputNumberData } from './InputNumber.data'

export default {
  title: 'InputNumber',
}

export const Default = () => {
  const InputNumber = TreeDom.render(inputNumberData)

  return <InputNumber />
}
