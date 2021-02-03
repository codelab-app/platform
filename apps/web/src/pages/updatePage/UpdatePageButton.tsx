import { Button } from 'antd'
import React, { MutableRefObject } from 'react'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/JsonSchemaForm-ref'

interface UpdatePageButtonProps {
  submitRef: MutableRefObject<SubmitController | undefined>
}

export const UpdatePageButton = ({ submitRef }: UpdatePageButtonProps) => {
  return <Button onClick={() => submitRef.current?.submit()}>Save</Button>
}
