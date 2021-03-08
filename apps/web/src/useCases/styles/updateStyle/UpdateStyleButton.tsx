import { Button } from 'antd'
import React, { MutableRefObject } from 'react'
import { SubmitController } from '@codelab/frontend'

interface UpdateStyleButtonProps {
  submitRef: MutableRefObject<SubmitController | undefined>
}

export const UpdateStyleButton = ({ submitRef }: UpdateStyleButtonProps) => {
  return <Button onClick={() => submitRef.current?.submit()}>Save</Button>
}
