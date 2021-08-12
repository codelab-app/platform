import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../get-lambdas/LambdaRecord'

export const UpdateLambdaButton = (props: LambdaRecord) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.Lambda)

  return <Button onClick={() => openUpdateModal(props.id)}>Edit</Button>
}
