import React from 'react'
import { inputData } from './Input.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Input',
  parameters: {
    data: {
      Default: inputData,
    },
  },
}

export const Default = () => {
  const Input = Renderer.components(inputData)

  return <Input />
}
