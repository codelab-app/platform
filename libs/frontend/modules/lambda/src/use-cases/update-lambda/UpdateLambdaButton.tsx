import { Button } from 'antd'
import React from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { useLambdaDispatch } from '../../hooks'

export const UpdateLambdaButton = (lambda: LambdaFragment) => {
  const { openUpdateModal } = useLambdaDispatch()
  const onClick = () => openUpdateModal({ updateId: lambda.id, entity: lambda })

  return <Button onClick={onClick}>Edit</Button>
}
