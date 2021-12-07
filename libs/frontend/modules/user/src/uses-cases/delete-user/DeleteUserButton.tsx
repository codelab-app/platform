import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useUserDispatch } from '../../hooks'
import { DeleteUserButtonProps } from './types'

export const DeleteUserButton = ({ payload }: DeleteUserButtonProps) => {
  const { openDeleteModal } = useUserDispatch()
  const onClick = () => openDeleteModal(payload)

  return (
    <Button size="small" danger icon={<DeleteOutlined />} onClick={onClick} />
  )
}
