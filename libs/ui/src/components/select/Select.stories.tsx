import React from 'react'
import { selectData } from './Select.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Select',
}

export const Default = () => {
  const Select = TreeDom.render(selectData)

  return <Select />
}
