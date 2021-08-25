import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const AddHookToElementButton = ({ metadata }: { metadata?: any }) => {
  const { openCreateModal } = useCrudModalForm(EntityType.Hook)

  return (
    <Button
      type="primary"
      onClick={() => openCreateModal(metadata)}
      icon={<PlusOutlined />}
    >
      New hook
    </Button>
  )
}
