import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'

export const CreateLambdaButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Lambda)

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    >
      Add
    </Button>
  )
}
