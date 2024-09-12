import type { IRef } from '@codelab/shared/abstract/core'
import { Button } from 'antd'

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
