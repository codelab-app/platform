import React from 'react'
import { checkboxData } from './Checkbox.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Checkbox',
}

export const Default = () => {
  const Checkbox = TreeDom.render(checkboxData)

  return <Checkbox />
}
