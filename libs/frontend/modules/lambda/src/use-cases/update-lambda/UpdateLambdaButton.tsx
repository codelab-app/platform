import { Button } from 'antd'
import React from 'react'
import { LambdaFragment } from '../../graphql/lambda.fragment.graphql.gen'

export const UpdateLambdaButton = (lambda: LambdaFragment) => {
  return <Button onClick={() => null}>Edit</Button>
}
