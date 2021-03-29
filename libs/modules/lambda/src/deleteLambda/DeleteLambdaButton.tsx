import { Button } from 'antd'
import React, { useContext } from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'
import { GetAppGql, useDeleteLambdaMutation } from '@codelab/generated'
import { AppContext } from '@codelab/frontend/shared'

export const DeleteLambdaButton = (props: LambdaRecord) => {
  const { appId } = useContext(AppContext)
  const [mutate] = useDeleteLambdaMutation({
    refetchQueries: [{ query: GetAppGql, variables: { input: { appId } } }],
    variables: {
      input: {
        lambdaId: props.id,
      },
    },
  })

  return (
    <Button type="primary" danger onClick={() => mutate()}>
      Delete
    </Button>
  )
}
