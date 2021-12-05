import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../hooks'
import { CreateAppButtonProps } from './types'

export const CreateAppButton = ({ createNow }: CreateAppButtonProps) => {
  const { openCreateModal } = useAppDispatch()
  const icon = !createNow && <PlusOutlined />
  const onClick = () => openCreateModal()

  return (
    <Button onClick={onClick} icon={icon} type="primary">
      {createNow ? 'Create Now' : 'Create App'}
    </Button>
  )
}
