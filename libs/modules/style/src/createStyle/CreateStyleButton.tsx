import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateStyleButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.Style)

  return (
    <Button key="1" icon={<PlusOutlined />} onClick={() => openCreateModal()} />
  )
}
