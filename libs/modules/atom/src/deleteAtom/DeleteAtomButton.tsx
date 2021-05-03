import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteAtomButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() => openDeleteModal(ids)}
    />
  )
}
