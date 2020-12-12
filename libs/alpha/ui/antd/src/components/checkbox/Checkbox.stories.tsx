import React from 'react'
import { checkboxData } from './Checkbox.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Checkbox',
  parameters: {
    data: {
      Default: checkboxData,
    },
  },
}

export const Default = () => {
  const Checkbox = Renderer.components(checkboxData)

  return <Checkbox />
}
