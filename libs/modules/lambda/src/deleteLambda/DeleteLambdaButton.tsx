import { AppContext } from '@codelab/frontend/shared'
import { GetLambdasByLibraryId, useDeleteLambdaMutation } from '@codelab/hasura'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'

export const DeleteLambdaButton = (props: LambdaRecord) => {
  const { appId } = useContext(AppContext)

  const [mutate] = useDeleteLambdaMutation({
    refetchQueries: [
      {
        query: GetLambdasByLibraryId,
        variables: {
          libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
        },
      },
    ],
    variables: {
      id: props.id,
    },
  })

  return (
    <Button type="primary" danger onClick={() => mutate()}>
      Delete
    </Button>
  )
}
