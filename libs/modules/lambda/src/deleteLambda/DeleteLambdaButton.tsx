import {
  refetchGetLambdasByLibraryIdQuery,
  useDeleteLambdaMutation,
} from '@codelab/codegen/hasura'
import { AppPageContext } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { LambdaRecord } from '../getLambdas/LambdaRecord'

export const DeleteLambdaButton = (props: LambdaRecord) => {
  const { appId } = useContext(AppPageContext)

  const [mutate] = useDeleteLambdaMutation({
    refetchQueries: [
      refetchGetLambdasByLibraryIdQuery({
        libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
      }),
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
