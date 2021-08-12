import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const DeleteUserButton = ({ ids, metadata }: DeleteButtonProps) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.User)

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal(ids, metadata)}
    />
  )
}
