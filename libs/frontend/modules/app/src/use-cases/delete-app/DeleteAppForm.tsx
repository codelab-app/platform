import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useDeleteAppMutation } from '../appApi'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'

type DeleteAppFormProps = UniFormUseCaseProps<DeleteAppInput>

export const DeleteAppForm = (props: DeleteAppFormProps) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useDeleteAppMutation,
    mutationOptions: { refetchQueries: [] },
    mapVariables: (_, state) => ({ input: { appId: state.deleteIds[0] } }),
  })

  return (
    <FormUniforms<DeleteAppInput>
      onSubmit={handleSubmit}
      schema={DeleteAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete app "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
