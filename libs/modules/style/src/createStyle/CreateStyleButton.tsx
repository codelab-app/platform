import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateStyleButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Style)

  return (
    <Button key="1" icon={<PlusOutlined />} onClick={() => openCreateModal()} />
  )
}
