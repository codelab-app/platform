import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { LambdaRecord } from '../getLambdas/LambdaRecord'
import { updateLambdaState } from './UpdateLambdaState'

export const UpdateLambdaButton = (props: LambdaRecord) => {
  const [updateLambda, setUpdateLambda] = useRecoilState(updateLambdaState)

  return (
    <Button
      onClick={() => {
        setUpdateLambda({
          visible: true,
          lambdaId: props.id,
          body: props.body,
          name: props.name,
        })
      }}
    >
      Edit
    </Button>
  )
}
