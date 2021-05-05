import { DeleteOutlined } from '@ant-design/icons'
import {
  AppContext,
  DeleteButtonProps,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React, { useContext } from 'react'

export const DeletePageButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { appId } = useContext(AppContext)
  const { openDeleteModal } = useCRUDModalForm(EntityType.Page)

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
