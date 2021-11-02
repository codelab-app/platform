import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/props'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const UpdatePageButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.Page)

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
