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
import { refetchGetElementQuery } from '../../get-element'
import { useDeletePropMapBindingMutation } from './DeletePropMapBinding.api.graphql.gen'

export interface DeletePropMapBindingFormProps {
  elementId: string
}

export const DeletePropMapBindingForm = ({
  elementId,
  ...props
}: UniFormUseCaseProps<EmptyJsonSchemaType> &
  DeletePropMapBindingFormProps) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.PropMapBinding,
    useMutationFunction: useDeletePropMapBindingMutation,
    mutationOptions: {
      refetchQueries: [refetchGetElementQuery({ input: { elementId } })],
    },
    mapVariables: (_, state) => ({
      input: { propMapBindingIds: state.deleteIds },
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting prop map binding',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to delete the prop map binding "
        {metadata?.sourceKey} - {metadata?.targetKey}"?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
