import React from 'react'
import { dropdownData } from './Dropdown.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Dropdown',
}

export const Default = () => {
  const Dropdown = TreeDom.render(dropdownData)

  return <Dropdown />
}
