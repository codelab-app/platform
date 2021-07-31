import {
  refetchGetAtomsQuery,
  refetchGetTypesQuery,
  useDeleteAtomMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAtomInput, deleteAtomSchema } from './deleteAtomSchema'

type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomsForm = (props: DeleteAtomFormProps) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Atom,
    useMutationFunction: useDeleteAtomMutation,
    mutationOptions: {
      refetchQueries: [refetchGetAtomsQuery(), refetchGetTypesQuery()],
    },
    mapVariables: (_, state) => ({
      input: { atomId: state.deleteIds[0] },
    }),
  })

  return (
    <FormUniforms<DeleteAtomInput>
      data-testid="delete-atom-form"
      id="delete-atom-form"
      onSubmit={handleSubmit}
      schema={deleteAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete atom "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
