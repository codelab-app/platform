import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'

export const CreateComponentElementButton = () => {
  const { openCreateModal } = useCRUDModalForm(EntityType.ComponentElement)

  return (
    <Button type="primary" onClick={() => openCreateModal()}>
      Add ComponentElement
    </Button>
  )
}
