import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
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
