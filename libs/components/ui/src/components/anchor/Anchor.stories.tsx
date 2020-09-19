import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { anchorData } from './Anchor.data'

export default {
  title: 'Anchor',
}

export const Default = () => {
  const Anchor = TreeDom.render(anchorData)

  return <Anchor />
}
