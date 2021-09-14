import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const CreatePropMapBindingButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.PropMapBinding)

  return (
    <Button
      type="primary"
      onClick={() => openCreateModal()}
      icon={<PlusOutlined />}
    >
      Add Map Binding
    </Button>
  )
}
