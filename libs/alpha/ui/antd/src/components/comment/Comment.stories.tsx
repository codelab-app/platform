import React from 'react'
import { commentData } from './Comment.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Comment',
  parameters: {
    data: {
      Default: commentData,
    },
  },
}

export const Default = () => {
  const Comment = Renderer.components(commentData)

  return <Comment />
}
