import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useCreateAppModal } from './useCreateAppModal'

export const CreateAppButton = () => {
  const { openCreateAppModal } = useCreateAppModal()

  return (
    <Button type="primary" onClick={openCreateAppModal} icon={<PlusOutlined />}>
      Create App
    </Button>
  )
}
