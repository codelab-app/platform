import React from 'react'
import { tagData } from './Tag.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Tag',
  parameters: {
    data: {
      Default: tagData,
    },
  },
}

export const Default = () => {
  const Tag = Renderer.components(tagData)

  return <Tag />
}
