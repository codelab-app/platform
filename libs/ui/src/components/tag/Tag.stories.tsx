import React from 'react'
import { tagData } from './Tag.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Tag',
}

export const Default = () => {
  const Tag = TreeDom.render(tagData)

  return <Tag />
}
