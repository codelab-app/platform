import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreatePropTypeCButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.PropTypeC)

  return <Button icon={<PlusOutlined />} onClick={() => openCreateModal()} />
}
