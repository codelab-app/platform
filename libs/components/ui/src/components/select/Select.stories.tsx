import React from 'react'
import { selectData } from './Select.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Select',
}

export const Default = () => {
  const Select = TreeDom.render(selectData)

  return <Select />
}
