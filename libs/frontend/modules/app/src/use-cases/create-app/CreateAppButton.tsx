import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useApp } from '../../store/useApp'

export type CreateAppButton = {
  createNow?: boolean
}

export const CreateAppButton = ({ createNow }: CreateAppButton) => {
  const { openCreateModal } = useApp()
  const icon = !createNow && <PlusOutlined />
  const onClick = () => openCreateModal()

  return (
    <Button onClick={onClick} icon={icon} type="primary">
      {createNow ? 'Create Now' : 'Create App'}
    </Button>
  )
}
