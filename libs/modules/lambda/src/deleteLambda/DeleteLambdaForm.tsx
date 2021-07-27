import {
  DeleteLambdaInput,
  useDeleteLambdaMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteLambdaSchema } from './deleteLambdaSchema'

type DeleteLambdaFormProps = UniFormUseCaseProps<DeleteLambdaInput>

export const DeleteLambdaForm = (props: DeleteLambdaFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Lambda)
  const { deleteIds: appDeleteIds, metadata } = state

  const [mutate, { loading: deleting }] = useDeleteLambdaMutation({
    awaitRefetchQueries: true,
    // refetchQueries: [refetchGetLambdasQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const onSubmit = (data: DeleteLambdaInput) => {
    return mutate({
      variables: {
        input: {
          lambdaId: data.lambdaId,
        },
      },
    })
  }

  return (
    <FormUniforms<DeleteLambdaInput>
      onSubmit={onSubmit}
      schema={deleteLambdaSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting lambda',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete lambda "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
