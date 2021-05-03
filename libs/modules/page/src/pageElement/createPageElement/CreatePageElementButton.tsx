import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreatePageElementButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.PageElement)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
