import React from 'react'
import { dropdownData } from './Dropdown.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Dropdown',
  parameters: {
    data: {
      Default: dropdownData,
    },
  },
}

export const Default = () => {
  const Dropdown = Renderer.components(dropdownData)

  return <Dropdown />
}
