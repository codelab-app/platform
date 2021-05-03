import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdateComponentButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCRUDModalForm(EntityType.Component)

  return (
    <Button
      size="small"
      type="primary"
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
