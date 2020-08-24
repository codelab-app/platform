import React from 'react'
import { messageData } from './Message.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Message',
}

export const Default = () => {
  const Message = TreeDom.render(messageData)

  return <Message />
}
