import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { commentData } from './Comment.data'

export default {
  title: 'Comment',
}

export const Default = () => {
  const Comment = TreeDom.render(commentData)

  return <Comment />
}
