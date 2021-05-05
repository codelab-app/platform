import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdatePageButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCRUDModalForm(EntityType.Page)

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => {
        if (!id) {
          throw new Error('Page ID is not valid')
        }

        openUpdateModal(id)
      }}
    />
  )
}
