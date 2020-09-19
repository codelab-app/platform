import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { selectData } from './Select.data'

export default {
  title: 'Select',
}

export const Default = () => {
  const Select = TreeDom.render(selectData)

  return <Select />
}
