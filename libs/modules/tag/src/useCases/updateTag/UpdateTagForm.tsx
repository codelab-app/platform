import {
  refetchGetTagsQuery,
  UpdateTagData,
  useUpdateTagMutation,
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
import { updateTagSchema } from './updateTagSchema'

export const UpdateTagForm = (props: UniFormUseCaseProps<UpdateTagData>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useUpdateTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: ({ name }: UpdateTagData, state) => ({
      input: { data: { name }, id: state.updateId },
    }),
  })

  return (
    <FormUniforms<UpdateTagData>
      onSubmit={handleSubmit}
      schema={updateTagSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating tag',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
