import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { notificationData } from './Notification.data'

export default {
  title: 'Notification',
}

export const Default = () => {
  const Notification = TreeDom.render(notificationData)

  return <Notification />
}
