import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateComponentButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Component)

  return (
    <Button
      size="small"
      type="primary"
      icon={<PlusOutlined data-testid="create-component-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
