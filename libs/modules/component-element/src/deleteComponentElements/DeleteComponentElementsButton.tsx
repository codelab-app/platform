import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteComponentElementsButton = ({
  ids,
  disabled,
}: DeleteButtonProps) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.ComponentElement)

  return (
    <Button
      size="small"
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => {
        openDeleteModal(ids)
      }}
    />
  )
}
