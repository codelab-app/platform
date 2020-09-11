import React from 'react'
import { notificationData } from './Notification.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Notification',
}

export const Default = () => {
  const Notification = TreeDom.render(notificationData)

  return <Notification />
}
