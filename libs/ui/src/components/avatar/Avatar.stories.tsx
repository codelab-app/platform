import React from 'react'
import { avatarData } from './Avatar.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Avatar',
}

export const Default = () => {
  const Avatar = TreeDom.render(avatarData)

  return <Avatar />
}
