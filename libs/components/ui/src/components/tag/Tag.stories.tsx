import React from 'react'
import { tagData } from './Tag.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Tag',
}

export const Default = () => {
  const Tag = TreeDom.render(tagData)

  return <Tag />
}
