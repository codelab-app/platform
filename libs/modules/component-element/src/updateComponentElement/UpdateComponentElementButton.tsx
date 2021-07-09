import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdateComponentElementButton = ({
  id,
  disabled,
}: UpdateButtonProps) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.ComponentElement)

  return (
    <Button
      disabled={disabled}
      size="small"
      type="primary"
      icon={<EditOutlined />}
      onClick={() => {
        if (!id) {
          throw new Error('Missing ComponentElement id')
        }

        openUpdateModal(id)
      }}
    />
  )
}
