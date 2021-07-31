import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'

export const UpdateLambdaButton = (props: LambdaRecord) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.Lambda)

  return <Button onClick={() => openUpdateModal(props.id)}>Edit</Button>
}
