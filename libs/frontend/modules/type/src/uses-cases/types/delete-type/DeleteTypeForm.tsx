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
import { useDeleteTypeMutation } from '../typeEndpoints'

type DeleteTypeFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteTypeForm = (props: DeleteTypeFormProps) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Type,
    mapVariables: (_, state) => ({
      input: { typeId: state.deleteIds[0] },
    }),
    useMutationFunction: useDeleteTypeMutation,
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting type',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete type "{metadata?.name}"?</h4>
    </FormUniforms>
  )
}
