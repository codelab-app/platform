import { DeleteOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const DeleteUserButton = ({ ids }: Pick<DeleteButtonProps, 'ids'>) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.User)

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal(ids)}
    />
  )
}
