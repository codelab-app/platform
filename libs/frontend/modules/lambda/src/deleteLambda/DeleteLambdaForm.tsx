import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import {
  DeleteLambdaInput,
  refetchGetLambdasQuery,
  useDeleteLambdaMutation,
} from '@codelab/shared/codegen/graphql'
import React, { useEffect } from 'react'
import { deleteLambdaSchema } from './deleteLambdaSchema'

type DeleteLambdaFormProps = UniFormUseCaseProps<DeleteLambdaInput>

export const DeleteLambdaForm = (props: DeleteLambdaFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Lambda)
  const { deleteIds: lambdaDeleteIds, metadata } = state

  const [mutate, { loading: deleting }] = useDeleteLambdaMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetLambdasQuery()],
  })

  const onSubmit = (data: DeleteLambdaInput) => {
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
    <FormUniforms<DeleteLambdaInput>
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
