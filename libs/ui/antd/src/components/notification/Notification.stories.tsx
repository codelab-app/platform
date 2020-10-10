import React from 'react'
import { notificationData } from './Notification.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Notification',
}

export const Default = () => {
  const Notification = Renderer.components(notificationData)

  return <Notification />
}
