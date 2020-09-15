import React from 'react'
import { commentData } from './Comment.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Comment',
}

export const Default = () => {
  const Comment = TreeDom.render(commentData)

  return <Comment />
}
