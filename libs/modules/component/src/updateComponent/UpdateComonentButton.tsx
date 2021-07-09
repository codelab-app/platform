import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdateComponentButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.Component)

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => {
        if (!id) {
          throw new Error('Component ID is not valid')
        }

        openUpdateModal(id)
      }}
    />
  )
}
