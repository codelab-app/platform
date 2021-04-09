import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreatePageButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.Page)

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    >
      Add
    </Button>
  )
}
