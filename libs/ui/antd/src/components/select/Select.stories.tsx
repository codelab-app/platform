import React from 'react'
import { selectData } from './Select.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Select',
  parameters: {
    data: {
      Default: selectData,
    },
  },
}

export const Default = () => {
  const Select = Renderer.components(selectData)

  return <Select />
}
