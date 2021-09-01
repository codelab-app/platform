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
import { refetchGetComponentsQuery } from '../get-components/GetComponents.api.graphql'
import { useDeleteComponentMutation } from './DeleteComponent.api.graphql'

type DeleteComponentForm = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentForm = (props: DeleteComponentForm) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Component,
    useMutationFunction: useDeleteComponentMutation,
    mutationOptions: {
      refetchQueries: [refetchGetComponentsQuery()],
    },
    mapVariables: (_, state) => ({
      input: { componentId: state.deleteIds[0] },
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete component "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
