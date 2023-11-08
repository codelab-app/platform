import type { IRef } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import React from 'react'

export const ExecuteLambdaButton = ({ id }: IRef) => {
  const onClick = () => {
    return null
  }

  return (
    <Button onClick={onClick} type="primary">
      Execute
    </Button>
  )
}
