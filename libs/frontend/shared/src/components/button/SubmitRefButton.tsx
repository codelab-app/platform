import { Button } from 'antd'
import React, { MutableRefObject } from 'react'
import { SubmitController } from '../form'

export interface SubmitRefProps {
  submitRef: MutableRefObject<SubmitController | undefined>
}

export const SubmitRefButton = ({ submitRef }: SubmitRefProps) => {
  return <Button onClick={() => submitRef.current?.submit()}>Save</Button>
}
