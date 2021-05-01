import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

export const CreatePageElementButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.PageElement)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
