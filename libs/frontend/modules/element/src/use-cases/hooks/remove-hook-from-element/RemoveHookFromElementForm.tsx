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
import { refetchGetElementQuery } from '../../get-element/GetElement.web.graphql.gen'
import { useRemoveHookFromElementMutation } from './RemoveHookFromElement.web.graphql.gen'

export type RemoveHookFromElementFormProps =
  UniFormUseCaseProps<EmptyJsonSchemaType> & { elementId: string }

export const RemoveHookFromElementForm = ({
  elementId,
  ...props
}: RemoveHookFromElementFormProps) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useRemoveHookFromElementMutation,
    mutationOptions: {
      refetchQueries: [
        refetchGetElementQuery({
          input: { elementId },
        }),
      ],
    },
    mapVariables: (_, state) => ({
      input: {
        hookId: state.deleteIds[0],
        elementId: elementId ?? state.metadata.element.id,
      },
    }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to remove the hook "{metadata?.hook?.type}" from
        element "{metadata?.element?.name}"?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
