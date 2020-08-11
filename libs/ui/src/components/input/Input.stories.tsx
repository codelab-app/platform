import React from 'react'
import { inputData } from './Input.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Input',
}

export const Default = () => {
  const Input = TreeDom.render(inputData)

  return <Input />
}
