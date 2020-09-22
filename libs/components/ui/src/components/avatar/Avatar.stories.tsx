import React from 'react'
import { avatarData } from './Avatar.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Avatar',
}

export const Default = () => {
  const Avatar = Renderer.components(avatarData)

  return <Avatar />
}
