import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { tagData } from './Tag.data'

export default {
  title: 'Tag',
}

export const Default = () => {
  const Tag = TreeDom.render(tagData)

  return <Tag />
}
