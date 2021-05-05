import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateAppButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.App)

  return (
    <Button
      type="primary"
      onClick={() => {
        openCreateModal()
      }}
      icon={<PlusOutlined />}
    >
      Create App
    </Button>
  )
}

export const CreateAppButtonNow = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.App)

  return (
    <Button onClick={() => openCreateModal()} type="primary">
      Create Now
    </Button>
  )
}
