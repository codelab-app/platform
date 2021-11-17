import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import React from 'react'
import { useAtomDispatch } from '../../hooks'

export const DeleteAtomButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { openDeleteModal } = useAtomDispatch()
  const onClick = () => openDeleteModal({ deleteIds: ids })

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
