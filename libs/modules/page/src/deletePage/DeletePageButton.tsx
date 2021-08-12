import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeletePageButton = ({ ids, ...props }: DeleteButtonProps) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Page)

  return (
    <Button
      danger
      size="small"
      type="primary"
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal(ids)}
      {...props}
    />
  )
}
