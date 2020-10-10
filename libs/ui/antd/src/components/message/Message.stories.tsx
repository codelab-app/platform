import React from 'react'
import { messageData } from './Message.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Message',
}

export const Default = () => {
  const Message = Renderer.components(messageData)

  return <Message />
}
