import React from 'react'
import { inputData } from './Input.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Input',
}

export const Default = () => {
  const Input = TreeDom.render(inputData)

  return <Input />
}
