import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../hooks'

export const CreateAppButton = ({ text }: ButtonProps) => {
  const { openCreateModal } = useAppDispatch()
  const icon = !text && <PlusOutlined />
  const onClick = () => openCreateModal()

  return (
    <Button icon={icon} onClick={onClick} type="primary">
      {text ?? 'Create App'}
    </Button>
  )
}
