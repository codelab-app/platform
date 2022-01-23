import { SubmitController } from '@codelab/frontend/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import Button from 'antd/lib/button/button'
import React, { MutableRefObject } from 'react'

export interface SubmitRefProps {
  submitRef: MutableRefObject<Maybe<SubmitController>>
}

export const SubmitRefButton = ({ submitRef }: SubmitRefProps) => {
  return <Button onClick={() => submitRef.current?.submit()}>Save</Button>
}
