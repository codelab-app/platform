import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { avatarData } from './Avatar.data'

export default {
  title: 'Avatar',
}

export const Default = () => {
  const Avatar = TreeDom.render(avatarData)

  return <Avatar />
}
