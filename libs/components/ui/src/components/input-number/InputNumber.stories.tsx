import React from 'react'
import { inputNumberData } from './InputNumber.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'InputNumber',
}

export const Default = () => {
  const InputNumber = TreeDom.render(inputNumberData)

  return <InputNumber />
}
