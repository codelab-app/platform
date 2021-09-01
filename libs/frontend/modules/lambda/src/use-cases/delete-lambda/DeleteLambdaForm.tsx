import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import React, { useEffect } from 'react'
import { refetchGetLambdasQuery } from '../get-lambdas/GetLambdas.api.graphql'
import { useDeleteLambdaMutation } from './DeleteLambda.api.graphql'
import { DeleteLambdaSchema, deleteLambdaSchema } from './deleteLambdaSchema'

type DeleteLambdaFormProps = UniFormUseCaseProps<DeleteLambdaSchema>

export const DeleteLambdaForm = (props: DeleteLambdaFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Lambda)
  const { deleteIds: lambdaDeleteIds, metadata } = state

  const [mutate, { loading: deleting }] = useDeleteLambdaMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetLambdasQuery()],
  })

  const onSubmit = (data: DeleteLambdaSchema) => {
    return mutate({
      variables: {
        input: {
          lambdaId: data.lambdaId,
        },
      },
    })
  }

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  return (
    <FormUniforms<DeleteLambdaSchema>
      model={{
        lambdaId: lambdaDeleteIds[0],
      }}
      onSubmit={onSubmit}
      schema={deleteLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting lambda',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete lambda "{metadata?.name}"?</h4>
    </FormUniforms>
  )
}
