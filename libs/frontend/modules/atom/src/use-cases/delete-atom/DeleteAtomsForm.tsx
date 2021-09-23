import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { refetchGetAtomsQuery } from '../get-atoms/GetAtoms.web.graphql.gen'
import { useDeleteAtomMutation } from './DeleteAtoms.web.graphql.gen'

type DeleteAtomFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

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
      refetchQueries: [refetchGetAtomsQuery()],
    },
    mapVariables: (_, state) => ({
      input: { atomId: state.deleteIds[0] },
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-atom-form"
      id="delete-atom-form"
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
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
