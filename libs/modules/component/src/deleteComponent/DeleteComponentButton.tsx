import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteComponentButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.Component)

  return (
    <Button
      size="small"
      disabled={disabled}
      danger
      icon={<DeleteOutlined />}
      onClick={() => {
        openDeleteModal(ids)
      }}
    />
  )
}
