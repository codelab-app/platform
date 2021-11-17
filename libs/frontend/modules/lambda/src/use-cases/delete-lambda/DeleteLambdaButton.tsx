import { Button } from 'antd'
import React from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { useLambdaDispatch } from '../../hooks'

export const DeleteLambdaButton = (Lambda: LambdaFragment) => {
  const { openDeleteModal } = useLambdaDispatch()

  const onClick = () => {
    openDeleteModal({ deleteIds: [Lambda.id], entity: Lambda })
  }

  return (
    <Button type="primary" danger onClick={onClick}>
      Delete
    </Button>
  )
}
