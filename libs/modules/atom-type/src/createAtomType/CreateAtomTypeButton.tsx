import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateAtomTypeButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.AtomType)

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined data-testid="create-atomType-button" />}
      onClick={() => openCreateModal()}
    />
  )
}
