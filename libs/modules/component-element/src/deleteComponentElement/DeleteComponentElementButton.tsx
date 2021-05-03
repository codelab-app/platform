import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteComponentElementButton = ({
  ids,
  disabled,
}: DeleteButtonProps) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.ComponentElement)

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
