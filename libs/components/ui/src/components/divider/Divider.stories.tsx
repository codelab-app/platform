import React from 'react'
import { dividerData } from './Divider.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Divider',
}

export const Default = () => {
  const Divider = TreeDom.render(dividerData)

  return <Divider />
}
