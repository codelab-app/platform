import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'

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
