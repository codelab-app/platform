import React from 'react'
import { selectData } from './Select.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Select',
}

export const Default = () => {
  const Select = Renderer.components(selectData)

  return <Select />
}
