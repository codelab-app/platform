import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { checkboxData } from './Checkbox.data'

export default {
  title: 'Checkbox',
}

export const Default = () => {
  const Checkbox = TreeDom.render(checkboxData)

  return <Checkbox />
}
