import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
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
