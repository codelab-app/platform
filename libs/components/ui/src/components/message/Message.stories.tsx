import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { messageData } from './Message.data'

export default {
  title: 'Message',
}

export const Default = () => {
  const Message = TreeDom.render(messageData)

  return <Message />
}
