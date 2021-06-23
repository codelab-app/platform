import {
  refetchGetInterfacesQuery,
  useDeleteInterfaceMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import React from 'react'

type DeleteInterfaceFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteInterfaceForm = (props: DeleteInterfaceFormProps) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useMutationCrudForm({
    entityType: EntityType.Interface,
    mapVariables: (_, state) => ({
      input: { interfaceId: state.deleteIds[0] },
    }),
    useMutationFunction: useDeleteInterfaceMutation,
    mutationOptions: { refetchQueries: [refetchGetInterfacesQuery()] },
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting interface',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete interface "{metadata?.name}"?</h4>
    </FormUniforms>
  )
}
