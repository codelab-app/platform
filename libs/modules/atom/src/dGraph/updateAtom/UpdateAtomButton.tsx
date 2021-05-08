import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const UpdateAtomButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCRUDModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => {
        if (!id) {
          throw new Error('Atom ID is not valid')
        }

        openUpdateModal(id)
      }}
    />
  )
}
