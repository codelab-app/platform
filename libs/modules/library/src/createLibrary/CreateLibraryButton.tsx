import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateLibraryButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.Library)

  return <Button icon={<PlusOutlined />} onClick={() => openCreateModal()} />
}
