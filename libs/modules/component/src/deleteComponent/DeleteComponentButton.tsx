import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteComponentButton = ({
  ids,
  disabled,
  metadata,
}: DeleteButtonProps) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Component)

  return (
    <Button
      disabled={disabled}
      danger
      size="small"
      type="primary"
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal(ids, metadata)}
    />
  )
}
