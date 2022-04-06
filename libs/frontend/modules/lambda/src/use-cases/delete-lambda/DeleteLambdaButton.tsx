import { Button } from 'antd'
import React from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'

export const DeleteLambdaButton = (Lambda: LambdaFragment) => {
  return (
    <Button danger onClick={() => null} type="primary">
      Delete
    </Button>
  )
}
