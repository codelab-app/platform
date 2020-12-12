import React from 'react'
import { messageData } from './Message.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Message',
  parameters: {
    data: {
      Default: messageData,
    },
  },
}

export const Default = () => {
  const Message = Renderer.components(messageData)

  return <Message />
}
