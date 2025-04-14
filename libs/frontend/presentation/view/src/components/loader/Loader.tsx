'use client'

import { message } from 'antd'
import { useEffect } from 'react'

import { Backdrop } from './Backdrop'

export const DevLoading = (title: string) => {
  const Component = () => {
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
      void messageApi.open({
        content: title,
        duration: 0,
        type: 'loading',
      })
    }, [])

    return <Backdrop>{contextHolder}</Backdrop>
  }

  Component.displayName = `DevSpinner(${title})`

  return Component
}
