import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateComponentElementButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.ComponentElement)

  return (
    <Button type="primary" onClick={() => openCreateModal()}>
      Add ComponentElement
    </Button>
  )
}
