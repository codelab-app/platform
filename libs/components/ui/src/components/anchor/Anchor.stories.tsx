import React from 'react'
import { anchorData } from './Anchor.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Anchor',
}

export const Default = () => {
  const Anchor = TreeDom.render(anchorData)

  return <Anchor />
}
