import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateComponentElementButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.ComponentElement)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-component-element-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
