'use client'

import type { NotificationInstance } from 'antd/es/notification/interface'
import type { PropsWithChildren } from 'react'

import { notification } from 'antd'
import { createContext } from 'react'

export const NotificationContext = createContext<NotificationInstance>(null!)

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}
