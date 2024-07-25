'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { useCreateAppModal } from './create-app.state'

export const CreateAppButton = ({ children }: PropsWithChildren) => {
  const createAppModal = useCreateAppModal()
  const icon = !children && <PlusOutlined />
  const onClick = () => createAppModal.open(undefined)

  return (
    <Button icon={icon} onClick={onClick} type="primary">
      {children ?? 'Create App'}
    </Button>
  )
}
