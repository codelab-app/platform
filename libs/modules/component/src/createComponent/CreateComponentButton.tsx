import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateComponentButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.Component)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-component-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
