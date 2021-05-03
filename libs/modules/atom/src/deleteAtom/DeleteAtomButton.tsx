import { DeleteOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

interface DeleteAtomButtonProps {
  disabled: boolean
  ids: Array<string>
}

export const DeleteAtomButton = ({ disabled, ids }: DeleteAtomButtonProps) => {
  const { openDeleteModal, state } = useCRUDModalForm(EntityType.Atom)

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() => openDeleteModal(ids)}
    />
  )
}
