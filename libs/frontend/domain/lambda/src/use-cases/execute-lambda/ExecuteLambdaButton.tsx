import { Button } from 'antd'
import React from 'react'
import type { LambdaFragment } from '../../graphql/lambda.fragment.graphql.gen'

export const ExecuteLambdaButton = ({ id }: LambdaFragment) => {
  const onClick = () => {
    return null
  }

  return (
    <Button onClick={onClick} type="primary">
      Execute
    </Button>
  )
}
