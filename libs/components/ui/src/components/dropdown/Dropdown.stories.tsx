import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { dropdownData } from './Dropdown.data'

export default {
  title: 'Dropdown',
}

export const Default = () => {
  const Dropdown = TreeDom.render(dropdownData)

  return <Dropdown />
}
