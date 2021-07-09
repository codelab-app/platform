import { DeleteOutlined } from '@ant-design/icons'
import {
  AppPageContext,
  DeleteButtonProps,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React, { useContext } from 'react'

export const DeletePageButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { appId } = useContext(AppPageContext)
  const { openDeleteModal } = useCrudModalForm(EntityType.Page)

  return (
    <Button
      danger
      size="small"
      type="primary"
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal(ids)}
    />
  )
}
