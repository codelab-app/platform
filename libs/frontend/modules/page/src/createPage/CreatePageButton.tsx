import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const CreatePageButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Page)

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    />
  )
}
