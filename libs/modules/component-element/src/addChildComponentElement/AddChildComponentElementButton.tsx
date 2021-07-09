import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

interface AddChildComponentElementButtonProps {
  disabled: boolean
}

export const AddChildComponentElementButton = ({
  disabled,
}: AddChildComponentElementButtonProps) => {
  const { openCreateModal } = useCrudModalForm(EntityType.ChildComponentElement)

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      onClick={() => openCreateModal()}
      icon={<PlusOutlined />}
    />
  )
}
