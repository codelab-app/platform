import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'

export const DeleteLambdaButton = (props: LambdaRecord) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Lambda)

  return (
    <Button
      type="primary"
      danger
      onClick={() => openDeleteModal([props.id], props)}
    >
      Delete
    </Button>
  )
}
