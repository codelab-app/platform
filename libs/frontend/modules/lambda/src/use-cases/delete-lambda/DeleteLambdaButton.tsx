import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../get-lambdas/LambdaRecord'

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
