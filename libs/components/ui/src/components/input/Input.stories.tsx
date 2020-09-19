import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { inputData } from './Input.data'

export default {
  title: 'Input',
}

export const Default = () => {
  const Input = TreeDom.render(inputData)

  return <Input />
}
