import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import {
  refetchGetInterfaceQuery,
  useDeleteFieldMutation,
} from '@codelab/graphql'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { InterfaceContext } from '../../interfaces'

type DeleteFieldFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteFieldForm = (props: DeleteFieldFormProps) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useMutationCrudForm({
    entityType: EntityType.Field,
    mutationOptions: {
      refetchQueries: [refetchGetInterfaceQuery({ input: { interfaceId } })],
    },
    useMutationFunction: useDeleteFieldMutation,
    mapVariables: (_, crudModalState) => ({
      input: { fieldId: crudModalState.deleteIds[0] },
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting Field',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete field "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
