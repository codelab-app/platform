import { InternalRefetchQueriesInclude } from '@apollo/client/core/types'
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
import { refetchGetElementGraphQuery } from '../get-element-graph'
import { useDeleteElementMutation } from './DeleteElement.web.graphql.gen'

export type DeleteElementFormProps =
  UniFormUseCaseProps<EmptyJsonSchemaType> & {
    refetchQueries?: InternalRefetchQueriesInclude
  }

export const DeleteElementForm = ({
  onSubmitError,
  refetchQueries,
  onSubmitSuccess,
  ...props
}: DeleteElementFormProps) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Element,
    useMutationFunction: useDeleteElementMutation,
    mapVariables: (_, state) => ({
      input: { elementId: state.deleteIds[0] },
    }),
    mutationOptions: (state) => ({
      refetchQueries: [
        refetchGetElementGraphQuery({
          input: { where: { id: state.deleteIds[0] } },
        }),
        ...(refetchQueries ?? []),
      ],
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component element',
      })}
      onSubmitSuccess={[
        () => reset(),
        ...(Array.isArray(onSubmitSuccess)
          ? onSubmitSuccess
          : [onSubmitSuccess]),
      ]}
      {...props}
    >
      <h4>
        Are you sure you want to delete{' '}
        {metadata?.name ? `the element "${metadata?.name}"` : 'that element'}?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
