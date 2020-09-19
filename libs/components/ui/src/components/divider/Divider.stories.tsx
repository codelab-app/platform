import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { dividerData } from './Divider.data'

export default {
  title: 'Divider',
}

export const Default = () => {
  const Divider = TreeDom.render(dividerData)

  return <Divider />
}
